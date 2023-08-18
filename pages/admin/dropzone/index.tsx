// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/solid/styles.css";
 import { NextPage } from "next/types";
 import { OurFileRouter } from "../../../fonctions/uploadthing";
 import { UploadButton } from "@uploadthing/react";
 
interface Props {
  dirs: string[];
}
const Home: NextPage<Props> = ({ dirs }) => {
  return (
    <div className="">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
 
export default Home;