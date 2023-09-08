import React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

type ProductProps = {
  id: number;
  name: string;
  description: string;
  imagePaths: string[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const post = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  const imagePaths = [];
  post.image_key1 && imagePaths.push(post.image_path1);
  post.image_key2 && imagePaths.push(post.image_path2);
  post.image_key3 && imagePaths.push(post.image_path3);
  post.image_key4 && imagePaths.push(post.image_path4);
  post.image_key5 && imagePaths.push(post.image_path5);
  const product: ProductProps = {
    id: post.id,
    name: post.name,
    description: "",
    imagePaths: imagePaths,
  };
  return {
    props: product,
  };
};

const Post: React.FC<ProductProps> = (props) => {
  return (
    <Layout>
      <div className="container">
        <div className="product">
          <h1>{props.name}</h1>
          <p>{props.description}</p>
          <hr />
          <p>
            <strong>Color:</strong>
            <span>props.color</span>
          </p>
          <div className="image-container">
            <div className="image-list">
              <ul>
                {props.imagePaths.map((imagePath, index) => (
                  <li key={index}>
                    <img src={imagePath} alt={props.name} />
                  </li>
                ))}
                <li></li>
              </ul>
            </div>
            <div className="image-show">
              <img src={props.imagePaths[0]} alt={props.name} />
            </div>
            <div className="float-clear"></div>
            <div className="image-fullscreen"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
