import React,{ MouseEventHandler } from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { Gallery } from "@prisma/client";
import prisma from "../lib/prisma";


export const getServerSideProps: GetServerSideProps = async () => {
  const galleries:Array<Gallery> = await prisma.gallery.findMany({});
  return {
    props: { galleries },
  };
};

const Post: React.FC<{galleries:Gallery[]}> = ({galleries}) => {
  const showFullscreenImage: MouseEventHandler<HTMLImageElement> = (Event) => {
    const modal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image') as HTMLImageElement;
    fullscreenImage.src = (Event.target as HTMLImageElement).src;
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
       <div className="page-title">Foto Galery</div>
      <div className="grid-container">
         { galleries.map((item,index)=>{
        return <div key={index} className="hovereffects"> <img src={item.image_path} alt="" onClick={showFullscreenImage} className="mouse-pointer"/></div>
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
