import fs from "fs";
import path from "path";

export const saveBase64ImageToFile = (
  base64Image: string,
  email: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    if (matches && matches.length === 3) {
      const extension = matches[1].split("/")[1];
      const imageData = matches[2];
      const imagePath = path.join("public", "uploads", `${email}.${extension}`);
      const directoryPath = path.dirname(imagePath);

      // Create the directory if it doesn't exist
      fs.mkdirSync(directoryPath, { recursive: true });

      fs.writeFile(imagePath, imageData, "base64", (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(imagePath.replace("public/", ""));
        }
      });
    } else {
      reject(new Error("Invalid base64 image format"));
    }
  });
};
