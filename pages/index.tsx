import React, { useEffect } from "react";
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
  const [color, setColor] = React.useState(props.colors[0]?.id);
  const [brand, setBrand] = React.useState(props.brands[0]?.id);
  const [filteredList, setFilteredList] = React.useState(props.products);
  useEffect(() => {
    let filteredListTemp = props.products;
    if(color !== 0) filteredListTemp = filteredListTemp.filter(p => p.colorId === color);
    if(brand !== 0) filteredListTemp = filteredListTemp.filter(p => p.brandId === brand);
    setFilteredList(filteredListTemp);
  }

  ,[color,brand])

  return (
    <Layout>
      <div className="page-title">Ürünler</div>
      <div>
            <select name="colors" value={color} onChange={(e)=>setColor(Number(e.target.value))}>
            <option value="0">Tüm Renkler</option>
              {props.colors.map((c) => 
                 <option value={c.id} key={c.id}>{c.name}</option>
              )}
            </select>
            <select name="brands" className="ml-1" value={brand} onChange={(e)=>setBrand(Number(e.target.value))}>
            <option value="0">Tüm Markalar</option>
              {props.brands.map((b) => 
                 <option value={b.id} key={b.id}>{b.name}</option>
              )}
            </select>
        </div>
      <div className="grid-container">
        {filteredList.map((p,index) => ( <Card card={p} key={index}/>

           
        ))}
            
      </div>
    </Layout>
  );
};

export default Blog;
