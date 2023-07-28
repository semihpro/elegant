import React from "react";
//import 'bootstrap/dist/css/bootstrap.css'
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Card, { CardProps } from "../components/Card";
import prisma from '../lib/prisma'
import { Product, Color, Brand } from "@prisma/client";

type ProductProps = {
  colors: Array<Color>;
  brands: Array<Brand>;
  products: Array<Product>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const brands = await prisma.brand.findMany({});
  const colors = await prisma.color.findMany({});
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
  const data:ProductProps ={
    products,
    colors,
    brands
  }
  
  return {
    props: { ...data },
  };
};


const Blog: React.FC<ProductProps> = (props) => {
  return (
    <Layout>
      <div className="page-title">Ürünler</div>
      <div>
            <select name="colors">
            <option value="">Tüm Renkler</option>
              {props.colors.map((c) => 
                 <option value={c.id}>{c.name}</option>
              )}
            </select>
            <select name="brands">
            <option value="">Tüm Markalar</option>
              {props.brands.map((b) => 
                 <option value={b.id}>{b.name}</option>
              )}
            </select>
            <button className="btn btn-gray"> Getir <i className="fa fa-search" aria-hidden="true"></i> </button>
        </div>
      <div className="grid-container">
        {props.products.map((p) => (
            <Card card={p}/>
        ))}
            
      </div>
    </Layout>
  );
};

export default Blog;
