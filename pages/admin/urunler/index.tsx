import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import { Product } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { useRouter } from "next/router";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
}
interface ProductWithBrandAndColor extends Product {
  brand: Brand;
  color: Color;
}
type productlist = ProductWithBrandAndColor[];

export const getServerSideProps: GetServerSideProps = async () => {
  const products: productlist = await prisma.product.findMany({
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

const Home: NextPage<{products:productlist}> = ({ products }) => {
  const route = useRouter();
  return (
    <Layout>
    <div className="page-title">
    <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Ürünler", link:"/urunler"},]}/>
    </div>
    <div className="search_and_add mt-2 mb-2">
      <input type="text" name="search_text" id="search_text" placeholder="Aranacak kelime"/>
      <Link href={"/admin/urunler/ekle"} className="btn btn-green">Ekle <i className="fa fa-plus" aria-hidden="true"></i></Link>
    </div>
    <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">Rengi</div>
      <div className="col col-2">Adı</div>
      <div className="col col-3">Markası</div>
      <div className="col col-4">Sırası</div>
      <div className="col col-5">İşlem</div>
    </li>
    {
      products.map(item=>{
        return (<li className="table-row" key={item.id}>
          <div className="col col-1" data-label="Job Id">{item.color.name}</div>
          <div className="col col-2" data-label="Customer Name">{item.name}</div>
          <div className="col col-3" data-label="Amount">{item.brand.name}</div>
          <div className="col col-4" data-label="Payment Status">
            <img src={"/"+item.image_path1} alt="" width={"25px"} height={"25px"}/>
            </div>
          <div className="col col-5" data-label="Payment Status"> 
            <i className="fa fa-pencil tooltip mouse-pointer" aria-hidden="true"> <span className="tooltiptext">Ürün Düzenle</span></i> 
            <i className="fa fa-trash tooltip mouse-pointer color-red" aria-hidden="true"> <span className="tooltiptext">Ürünü Sil</span></i>
            </div>
          </li>)
      })}
  
  </ul>

    </Layout>
  );
};

export default Home;