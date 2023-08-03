import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import prisma from "../../../lib/prisma";
import { Brand, Color } from "@prisma/client";
import Swal from 'sweetalert2'

type Props = {
  Brands: Brand[];
  Colors: Color[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props: Props = {Brands:[],Colors:[]};
  try {
    const brands = await prisma.brand.findMany({});
    const colors = await prisma.color.findMany({});
    props.Brands=brands;
    props.Colors=colors;
    return {props}
  } catch (error) {
    return {props};
  }
}

const Home: NextPage<Props> = (props) => {
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
      const name = (document.getElementById('name') as HTMLInputElement);
      const colorId=(document.getElementById('colorId') as HTMLInputElement);
      const brandId=(document.getElementById('brandId') as HTMLInputElement);
      const result = await axios.post('/api/admin/product',{
        name: name.value, colorId: colorId.value, brandId:brandId.value
      })
      Swal.fire({title:'Kayıt İşle', text:'Kayit islemi gerceklestirildi', timer:2000});
      name.value='';
      colorId.value='';
      brandId.value='';
    } catch (err) {
      Swal.fire('islem gerceklestirilemedi', 'Butun alanlari doldurdugunuzdan emin olunuz','warning');
    }
  }
  return (
    <Layout>
      <div className="page-title">
        <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Urunler", link:"/admin/urunler"}, {text: "Ürün Ekle"}]}/>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
          <label htmlFor={"name"} className="form__label">Ürün Adı</label>
        </div>
        <div className="form__group field">
           <select name="colorId" id="colorId">
            <option value="">Tüm Renkler</option>
              {props.Colors.map((c) => 
                 <option key={c.id} value={c.id}>{c.name}</option>
              )}
            </select>
        </div>
        <div className="form__group field">
           <select name="brandId" id="brandId">
            <option value="">Tüm Markalar</option>
              {props.Brands?.map((b) => 
                 <option key={b.id} value={b.id}>{b.name}</option>
              )}
            </select>
        </div>
        <div className="form__group field">
          <button type="submit" className="btn btn-green">Ekle <i className="fa fa-plus" aria-hidden="true"></i></button>  
        </div>
        </form>

      </div>
    </Layout>
  );
};


export default Home;