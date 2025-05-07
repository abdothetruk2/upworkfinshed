"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
interface ImageUploadProps {
  handleUpload: (mainImage: boolean, imageUrl: string) => void;
  setIsUploadingToUT: (isUploading: boolean) => void;
  mainImage?: boolean;
}

function ImageUpload({
  handleUpload,
  setIsUploadingToUT,
  mainImage = false,
}: ImageUploadProps) {
  const [reset, setReset] = useState(false);

  return (
    <>
      <div className="w-50 h-48 flex items-center justify-center overflow-hidden border border-gray-300 rounded-lg">
        {!reset && (
          <UploadDropzone
            appearance={{
              button({ ready }) {
                return {
                  color: "black",
                };
              },
            }}
            endpoint={(routeRegistry) => routeRegistry.imageUploader}
            onUploadAborted={() => {
              setReset((prev) => !prev);
              setTimeout(() => setReset((prev) => !prev), 0);
            }}
            onClientUploadComplete={(res) => {
              handleUpload(mainImage, res[0].ufsUrl);
              setIsUploadingToUT(false);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message} `);
              setReset((prev) => !prev);
              setTimeout(() => setReset((prev) => !prev), 0);
            }}
            onUploadBegin={() => {
              setIsUploadingToUT(true);
            }}
          />
        )}
      </div>
    </>
  );
}

export default ImageUpload;
