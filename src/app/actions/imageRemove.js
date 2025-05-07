"use server"

import { utapi } from "./uploadthing";

export const imageRemove = async (imageKey) => {

    try {
        const result = await utapi.deleteFiles(imageKey);
        console.log("Image deleted successfully:",imageKey, result);

        return { success: true, message: "Image deleted successfully" }; // ✅ Ensure JSON-serializable return value
    } catch (error) {
        console.error("Error in imageRemove:", error);
        


        return { success: false, error: "Failed to delete image" }; // ✅ Return a plain object
    }
};