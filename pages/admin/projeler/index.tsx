import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import prisma from "../../../lib/prisma";
import { Gallery } from "@prisma/client";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState } from "react";
import GalleryImageUpload from "../../../components/GalleryImageUpload";

export async function getServerSideProps(context) {
  const gallery:Array<Gallery> = await prisma.gallery.findMany({});
  return {
    props:  {gallery} ,
  };
}
const Home: NextPage<{gallery:Gallery[]}> = ({gallery}) => {
  return (
    <Layout>
      <div className="page-title">
      <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Gallery"}]}/>
      </div>
          <div className="form__group field">
            <div className="grid-container">
              {gallery.map(item=>{
                return <GalleryImageUpload image={{id:item.id, path:(item.image_path ? item.image_path : `/no-image.jpg`), target:`image_path1`}}/>
              })}
              
            </div>
          </div>
    </Layout>  
  
  );
};

export default Home;