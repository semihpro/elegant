import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "../fonctions/uploadthing";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();