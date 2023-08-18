import type { NextApiRequest, NextApiResponse } from "next";
import "@uploadthing/react/styles.css";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { parse } from "path";
import { JSONParser } from "formidable/parsers";
 
const f = createUploadthing<{id:string, name:string}>();
 
const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function
 
type info={
  id:string;
  name:string
}
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    //Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const id_and_target = req.nextUrl.searchParams;
      //const user = await auth(req, res);
     
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: `user.ids` };
    })
    // .input((parser:info) => {
    //   if (typeof parser === "object" && parser !== null) {
    //     console.log({
    //       id: parser.id,
    //       name: parser.name,
    //     });
    //   } else {
    //     // Handle the case when the parser is not of the expected type
    //     console.error("Invalid parser:", parser);
    //   }
    //   return{
    //     type:'string'
    //   }
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", `metadata.userId`);
 
      console.log("file url", file.url);
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;