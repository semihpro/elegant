import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import fs from 'fs/promises';
import path from "path";

export type FileProps = {
  files: Array<string>
};

export const getServerSideProps: GetServerSideProps = async () => {
  let files = await fs.readdir(path.join(process.cwd() , '/public/images/projeler'),{withFileTypes:true});
  files = files.filter(x=>x.isFile());
  let fileNames:Array<string> = files.map(file=>"/images/projeler/"+file.name);
  return {
    props: { files: fileNames },
  };
};

const Post: React.FC<FileProps> = (props) => {
  const showFullscreenImage = (imageElement)=> {
    const modal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imageElement.target.src;
    modal.className = "modal modal-show";
  }
  
  const closeFullscreenImage = () => {
    const modal = document.getElementById('fullscreen-modal');
    //modal.style.display = 'none';
    modal.className = "modal";
  }
  

  return (
  <Layout>
    <div>
       <div className="page-title">Gallery</div>
      <div className="grid-container">
         { props.files.map((x,index)=>{
        return <div key={index} className="hovereffects"> <img src={x} alt="" onClick={showFullscreenImage} className="mouse-pointer"/></div>
        })}
      </div>
     
        <div id="fullscreen-modal" className="modal" onClick={closeFullscreenImage}>
          <span className="close-button" onClick={closeFullscreenImage}>&times;</span>
          <img id="fullscreen-image" src="" alt="Fullscreen Image"/>
        </div>
    </div>
   
     </Layout>);
};

export default Post;
