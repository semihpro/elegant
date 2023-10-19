import React, { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Card from '../components/Card';
import prisma from '../lib/prisma';
import { Color, Brand } from '@prisma/client';
import Breadcrumb from '../components/Breadcrumb';

interface ProductProps {
  colors: Array<Color>;
  brands: Array<Brand>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const brands = await prisma.brand.findMany({});
  const colors = await prisma.color.findMany({});
  return {
    props: { colors, brands } as ProductProps,
  };
};

//const LazyProducts = React.lazy(<Products/>);
function Products(props: { color; brand }) {
  //(async () => fetch('/api/product'))();
  const [products, setProducts] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState(products);

  useEffect((): void => {
    let filteredListTemp = products;
    if (props.color !== 0)
      filteredListTemp = filteredListTemp.filter(
        (p) => p.colorId === props.color
      );
    if (props.brand !== 0)
      filteredListTemp = filteredListTemp.filter(
        (p) => p.brandId === props.brand
      );
    setFilteredList(filteredListTemp);
  }, [props.color, props.brand, products]);
  useEffect((): void => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      {filteredList.map((p, index) => (
        <Card card={p} key={index} />
      ))}
    </>
  );
}
const Blog: React.FC<ProductProps> = (props) => {
  const [color, setColor] = React.useState(0);
  const [brand, setBrand] = React.useState(0);

  return (
    <Layout>
      <div className="page-title">
        <Breadcrumb items={[{ text: 'Urunler', link: '/' }]} />
      </div>
      <div>
        <select
          name="colors"
          value={color}
          onChange={(e) => setColor(Number(e.target.value))}
        >
          <option value="0">Tüm Renkler</option>
          {props.colors.map((c) => (
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
          {props.brands.map((b) => (
            <option value={b.id} key={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid-container">
        <Products brand={brand} color={color} />
      </div>
    </Layout>
  );
};

export default Blog;
