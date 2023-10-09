"use client";
import React, { useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.css'
import type { GetServerSideProps } from "next";
import Card, { CardProps } from "../components/Card";
import prisma from "../lib/prisma";
import { Product, Color, Brand } from "@prisma/client";
import { cache } from "react";
type ProductProps = {
  colors: Array<Color>;
  brands: Array<Brand>;
  products: Array<Product>;
};
export const revalidate = 3600000;
const getItem = cache(async () => {
  const brands = await prisma.brand.findMany({});
  const colors = await prisma.color.findMany({});
  const products = await prisma.product.findMany({
    include: {
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const data: ProductProps = {
    products,
    colors,
    brands,
  };

  return data;
});
export default async function Home() {
  const data = await getItem();
  console.log("data", data);
  const [color, setColor] = React.useState(0);
  const [brand, setBrand] = React.useState(0);
  const [filteredList, setFilteredList] = React.useState(data.products);
  useEffect(() => {
    let filteredListTemp = data.products;
    if (color !== 0)
      filteredListTemp = filteredListTemp.filter((p) => p.colorId === color);
    if (brand !== 0)
      filteredListTemp = filteredListTemp.filter((p) => p.brandId === brand);
    setFilteredList(filteredListTemp);
  }, [color, brand]);

  return (
    <>
      <div className="page-title">Ürünler</div>
      <div>
        <select
          name="colors"
          value={color}
          onChange={(e) => setColor(Number(e.target.value))}
        >
          <option value="0">Tüm Renkler</option>
          {data.colors.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="brands"
          className="ml-1"
          value={brand}
          onChange={(e) => setBrand(Number(e.target.value))}
        >
          <option value="0">Tüm Markalar</option>
          {data.brands.map((b) => (
            <option value={b.id} key={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid-container">
        {filteredList.map((p, index) => (
          <Card card={p} key={index} />
        ))}
      </div>
    </>
  );
}
