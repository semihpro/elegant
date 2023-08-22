import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import { Brand, Product } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

export const getServerSideProps: GetServerSideProps = async () => {
  const brands: Brand[] = await prisma.brand.findMany({});

  return {
    props: { brands },
  };
};

const Home: NextPage<{brands:Brand[]}> = ({ brands }) => {
  const route = useRouter();
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Emin misin?',
      text: "Silinen veri geri alinamaz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'iptal et',
      confirmButtonText: 'Evet, devam et!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.delete(`/api/admin/product/${id}`);
          await Swal.fire(
            'Silme basarili!',
            'Silme isleminiz gerceklestiridi.',
            'success'
          )
          window.location.reload();
        } catch (error) {
          await Swal.fire(
            'Silme basarisiz!',
            'Silme isleminiz gerceklestirilemedi.',
            'error'
          )
          console.log(`kayit basarisiz`,error);
        }
      }
    })
   
    
  }
  return (
    <Layout>
    <div className="page-title">
    <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Markalar"},]}/>
    </div>
    <div className="search_and_add mt-2 mb-2">
      <input type="text" name="search_text" id="search_text" placeholder="Aranacak kelime"/>
      <Link href={"/admin/markalar/ekle"} className="btn btn-green">Ekle <i className="fa fa-plus" aria-hidden="true"></i></Link>
    </div>
    <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-2">Adı</div>
      <div className="col col-5">İşlem</div>
    </li>
    {
      brands.map(item=>{
        return (<li className="table-row" key={item.id}>
          <div className="col col-1" data-label="Brand Name">{item.name}</div>
          <div className="col col-4" data-label="Operations"> 
            <Link href={`/admin/markalar/${item.id}`}><i className="fa fa-pencil tooltip mouse-pointer" aria-hidden="true"> <span className="tooltiptext">Marka Düzenle</span></i> </Link>
            <i onClick={()=>handleDelete(item.id)} className="fa fa-trash tooltip mouse-pointer color-red" aria-hidden="true"> <span className="tooltiptext">Marka Sil</span></i>
            </div>
          </li>)
      })}
  
  </ul>

    </Layout>
  );
};

export default Home;