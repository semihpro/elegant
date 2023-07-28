import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import path from "path";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";

type productlist ={
  list: Array<Product>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany({
    include: {
      brand: {
        select: {
          id:true,
          name: true
        },
      },
      color: {
        select: {
          id:true,
          name: true
        }
      }
    },
  });

  return {
    props: { products },
  };
};

const Home: NextPage<Product> = ({ products }) => {

  return (
    <Layout>
    <div className="page-title">
    <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Ürünler", link:"/urunler"},]}/>
    </div>
  
    <div>
      {products.map(item=>{
        return (<div><span>{item.name}</span></div>)
      })}
    </div>

    </Layout>
  );
};

export default Home;