import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import prisma from "../../../lib/prisma";
import { Color, Brand, Product } from "@prisma/client";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState } from "react";
import Swal from "sweetalert2";
import ImageUpload from "../../../components/ImageUpload";

type ProductProps = {
  colors: Array<Color>;
  brands: Array<Brand>;
  product: Product;
};
export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  const brands = await prisma.brand.findMany({});
  const colors = await prisma.color.findMany({});
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id) || -1,
    },
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
    product,
    colors,
    brands
  }
  console.log(product)
  return {
    props:  data ,
  };
}
const Home: NextPage<ProductProps> = (props) => {
  const [productData, setProductData] = useState(props.product);
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleSubmit = async (e:any) => {

    e.preventDefault();
    try {
      const result = await fetch(`/api/admin/product/${props.product.id}`, {
        method:`put`, 
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)});
      console.log(result)
      Swal.fire({title:'Guncelleme Islem Sonuc', text:'Islem basarili bir sekilde gerceklestirildi.', timer:2000});
    } catch (err) {
      Swal.fire('islem gerceklestirilemedi', 'Butun alanlari doldurdugunuzdan emin olunuz','warning');
    }
    
    // You can use an API call to send the data to the server or any other method to update the data.
  };
  
  return (
    <Layout>
      <div className="page-title">
      <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Ürünler", link:"/admin/urunler"}, {text:"Urun Duzenle"}]}/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form__group field">
            <input type="input" className="form__field" placeholder="Name" name="name" id='name' required 
              value={productData.name} 
              onChange={handleInputChange}
            />
            <label htmlFor={"name"} className="form__label">Ürün Adı</label>
          </div>
          <div className="form__group field">
            <select name="colorId" id="colorId"
             value={productData.colorId} 
             onChange={handleInputChange}
             >
              <option value="">Tüm Renkler</option>
                {props.colors.map((c) => 
                  <option key={c.id} value={c.id}>{c.name}</option>
                )}
              </select>
          </div>
          <div className="form__group field">
            <select name="brandId" id="brandId"
             value={productData.brandId}
             onChange={handleInputChange}
            >
              <option value="">Tüm Markalar</option>
                {props.brands?.map((b) => 
                  <option key={b.id} value={b.id}>{b.name}</option>
                )}
              </select>
          </div>
          <div className="form__group field">
            <div className="grid-container">
              <ImageUpload image={{id:productData.id, path:(productData.image_path1? `/images/product/${productData.id}/image_path1/${productData.image_path1}` : `/no-image.jpg`), target:`image_path1`}}/>
              <ImageUpload image={{id:productData.id, path:(productData.image_path2? `/images/product/${productData.id}/image_path2/${productData.image_path2}` : `/no-image.jpg`), target:`image_path2`}}/>
              <ImageUpload image={{id:productData.id, path:(productData.image_path3? `/images/product/${productData.id}/image_path3/${productData.image_path3}` : `/no-image.jpg`), target:`image_path3`}}/>
              <ImageUpload image={{id:productData.id, path:(productData.image_path4? `/images/product/${productData.id}/image_path4/${productData.image_path4}` : `/no-image.jpg`), target:`image_path4`}}/>
              <ImageUpload image={{id:productData.id, path:(productData.image_path5? `/images/product/${productData.id}/image_path5/${productData.image_path5}` : `/no-image.jpg`), target:`image_path5`}}/>
            </div>
            <button type="submit" className="btn btn-green">Guncelle <i className="fa fa-refresh" aria-hidden="true"></i></button>  
          </div>
      </form>
    </Layout>  
  
  );
};

export default Home;