"use client";

import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  deleteImageLink,
  getProductRelatedImages,
  insertImagesLink,
} from "@/server/action/product";
import { imageRemove } from "@/app/actions/imageRemove";

interface ProductImage {
  id: string;
  productId: string;
  imageLink: string;
  mainImage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ImageIdandDelete {
  softId: string;
  softDelete: boolean;
}

type ProductImageWithDelete = ProductImage & ImageIdandDelete;

const getMainImageUrlFromLocalStorage = () => {
  return localStorage.getItem("mainImageUrl") || "";
};

const setMainImageUrlToLocalStorage = (imageUrl: string) => {
  localStorage.setItem("mainImageUrl", imageUrl);
};

const getOtherImageUrlsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("otherImageUrls") || '["", "", ""]');
};

const setOtherImageUrlsToLocalStorage = (imageUrls: string[]) => {
  localStorage.setItem("otherImageUrls", JSON.stringify(imageUrls));
};

const getNewImagesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("newImages") || "[]");
};

const setNewImagesToLocalStorage = (imageUrls: string[]) => {
  localStorage.setItem("newImages", JSON.stringify(imageUrls));
};

function EditProductPicturesPage() {
  const [mainImageUrl, setMainImageUrl] = useState(
    getMainImageUrlFromLocalStorage
  );
  const [otherImageUrls, setOtherImageUrls] = useState<string[]>(
    getOtherImageUrlsFromLocalStorage
  );
  const [mainImages, setMainImages] = useState<ProductImageWithDelete[]>([]);
  const [otherImages, setOtherImages] = useState<ProductImageWithDelete[]>([]);
  const [temporarilyDeletedImages, setTemporarilyDeletedImages] = useState<
    ProductImageWithDelete[]
  >([]);
  const [newImages, setNewImages] = useState<string[]>(
    getNewImagesFromLocalStorage
  );
  const [loading, setLoading] = useState(false);
  const [uploadKey, setUploadKey] = useState(0); // Key to force re-render of ImageUpload component
  const [isUploadingToUT, setIsUploadingToUT] = useState(false);
  const otherBoxes = [{ id: 0 }, { id: 1 }, { id: 2 }];

  const { productId } = useParams() as { productId: string };

  const getAllImages = async (productId: string) => {
    const result = await getProductRelatedImages(productId);
    let softId = 1;
    setMainImages(
      result
        .filter((image) => image.mainImage)
        .map((image) => ({
          ...image,
          softId: (softId++).toString(),
          softDelete: false,
        }))
    );
    setOtherImages(
      result
        .filter((image) => !image.mainImage)
        .map((image) => ({
          ...image,
          softId: (softId++).toString(),
          softDelete: false,
        }))
    );
  };

  const initiateSoftDelete = (softId: string) => {
    const mainImage = mainImages.find((image) => image.softId === softId);
    const otherImage = otherImages.find((image) => image.softId === softId);

    if (mainImage) {
      setMainImages((prevImages) =>
        prevImages.map((image) =>
          image.softId === softId ? { ...image, softDelete: true } : image
        )
      );
      setTemporarilyDeletedImages((prevImages) => [
        ...prevImages,
        { ...mainImage, softDelete: true },
      ]);
    } else if (otherImage) {
      setOtherImages((prevImages) =>
        prevImages.map((image) =>
          image.softId === softId ? { ...image, softDelete: true } : image
        )
      );
      setTemporarilyDeletedImages((prevImages) => [
        ...prevImages,
        { ...otherImage, softDelete: true },
      ]);
    }
  };

  const handleUploadToUT = async (
    mainImage: boolean,
    imageUrl: string,
    index: number = 0
  ) => {
    try {
      setNewImagesToLocalStorage([...newImages, imageUrl]);

      if (mainImage) {
        setMainImageUrlToLocalStorage(imageUrl);
        setNewImages((prevImages) => {
          return [...prevImages, imageUrl];
        });
        setMainImageUrl(imageUrl);
      } else {
        const updatedOtherImageUrls = [...otherImageUrls];
        updatedOtherImageUrls[index] = imageUrl;
        setOtherImageUrlsToLocalStorage(updatedOtherImageUrls);
        setNewImages((prevImages) => {
          return [...prevImages, imageUrl];
        });
        setOtherImageUrls((prevUrls) => {
          return prevUrls.map((url, i) => (i === index ? imageUrl : url));
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await insertNewImagesToDB();
      await removeDeletedImageFromDBandUT();
      clearState();
      await getAllImages(productId);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      // Revert the softDeleted images
      setMainImages((prevImages) =>
        prevImages.map((image) =>
          image.softDelete ? { ...image, softDelete: false } : image
        )
      );
      setOtherImages((prevImages) =>
        prevImages.map((image) =>
          image.softDelete ? { ...image, softDelete: false } : image
        )
      );
      // Delete the new images from UploadThing
      await Promise.all(
        newImages.map(async (imageUrl) => {
          const fileKey = imageUrl.split("/").pop();

          return fileKey ? imageRemove(fileKey) : null;
        })
      );

      await Promise.all(
        getNewImagesFromLocalStorage().map(async (imageUrl: string) => {
          const fileKey = imageUrl.split("/").pop();

          return fileKey ? imageRemove(fileKey) : null;
        })
      );
      clearState();
      setUploadKey((prevKey) => prevKey + 1);
      await getAllImages(productId);
    } finally {
      setLoading(false);
      localStorage.clear();
    }
  };

  const handleDeleteImage = (softId: string) => {
    initiateSoftDelete(softId);
  };

  const handleRemoveNewImage = async (
    imageUrl: string,
    index: number,
    isMainImage: boolean
  ) => {
    const fileKey = imageUrl.split("/").pop();
    const res = await imageRemove(fileKey);

    setNewImages((prevImages) => {
      return prevImages.filter((url) => url !== imageUrl);
    });
    if (isMainImage) {
      setMainImageUrl("");
    } else {
      setOtherImageUrls((prevUrls) => {
        return prevUrls.map((url, i) => (i === index ? "" : url));
      });
    }
  };

  const clearState = () => {
    setNewImages([]);
    setMainImageUrl("");
    setOtherImageUrls(["", "", ""]);
    setTemporarilyDeletedImages([]);
    localStorage.clear();
  };

  const removeDeletedImageFromDBandUT = async () => {
    temporarilyDeletedImages.forEach(async (image) => {
      await deleteImageLink(image.id);
      const fileKey = image.imageLink.split("/").pop();
      fileKey && (await imageRemove(fileKey));
    });
  };

  const insertNewImagesToDB = async () => {
    newImages.forEach(async (imageUrl) => {
      await insertImagesLink({
        productId,
        imageLink: imageUrl,
        mainImage: mainImageUrl === imageUrl,
      });
    });
  };

  useEffect(() => {
    return () => {
      handleCancel();
    };
  }, []);

  useEffect(() => {
    productId && getAllImages(productId);
  }, [productId]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6">
      <div className="flex flex-col space-y-6 p-6 bg-white shadow-lg rounded-lg relative w-full max-w-4xl">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            Loading...
          </div>
        )}
  
        {/* Main Image Section */}
        <div>
          <h1 className="text-lg font-semibold mb-2">Main Image</h1>
          <div className="w-full max-w-xs h-64 bg-blue-400 flex items-center justify-center text-white font-bold rounded-lg relative group">
            {mainImages.length && !mainImages[0].softDelete ? (
              <div key={mainImages[0].softId} className="w-full h-full relative">
                <Image
                  src={mainImages[0].imageLink}
                  alt="Main Image"
                  fill
                  className="object-cover group-hover:opacity-75 rounded-lg"
                  priority
                />
                <button
                  onClick={() => handleDeleteImage(mainImages[0].softId)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8"
                >
                  &times;
                </button>
              </div>
            ) : mainImageUrl ? (
              <div className="w-full h-full relative">
                <Image
                  src={mainImageUrl }
                  alt="Main Image"
                  fill
                  className="object-cover group-hover:opacity-75 rounded-lg"
                  priority
                />
                <button
                  onClick={() => handleRemoveNewImage(mainImageUrl, 0, true)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div className="w-full h-full p-4 flex items-center justify-center">
                <ImageUpload
                  key={uploadKey}
                  handleUpload={(mainImage, imageUrl) =>
                    handleUploadToUT(mainImage, imageUrl)
                  }
                  mainImage={true}
                  setIsUploadingToUT={setIsUploadingToUT}
                />
              </div>
            )}
          </div>
        </div>
  
        {/* Secondary Images Section */}
        <div>
          <h1 className="text-lg font-semibold mb-2">Secondary Images</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full max-w-xs h-64 bg-blue-200 flex items-center justify-center text-white font-bold rounded-lg relative group"
              >
                {otherImages.length > index && !otherImages[index]?.softDelete ? (
                  <div key={otherImages[index].softId} className="w-full h-full relative">
                    <Image
                      src={otherImages[index].imageLink}
                      alt={`Secondary Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:opacity-75 rounded-lg"
                      priority
                    />
                    <button
                      onClick={() => handleDeleteImage(otherImages[index].softId)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8"
                    >
                      &times;
                    </button>
                  </div>
                ) : otherImageUrls[index] ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={otherImageUrls[index]}
                      alt={`Secondary Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:opacity-75 rounded-lg"
                      priority
                    />
                    <button
                      onClick={() => handleRemoveNewImage(otherImageUrls[index], index, false)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 flex items-center justify-center w-8 h-8"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    <ImageUpload
                      key={`${uploadKey}-${index}`}
                      handleUpload={(mainImage, imageUrl) =>
                        handleUploadToUT(mainImage, imageUrl, index)
                      }
                      mainImage={false}
                      setIsUploadingToUT={setIsUploadingToUT}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-200 text-black rounded-lg">
            <Link href="/admin">Back</Link>
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-all ${
              isUploadingToUT
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-blue-600"
            }`}
            onClick={handleSave}
            disabled={isUploadingToUT}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
  
  
}

export default EditProductPicturesPage;