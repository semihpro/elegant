import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";

interface Props {
  dirs: string[];
}

const Home: NextPage<Props> = ({ dirs }) => {

  return (
   <Layout>
    <div className="page-title">
    <Breadcrumb items={[{text:"Admin", link:"/admin"}]}/>
    </div>
   
      <div className="container">
        <ul>
          <li><Link href="/admin/urunler">Ürün Listesi</Link> </li>
        </ul>
        <ul>
          <li><Link href="/admin/renkler">Ürün Renkleri Listesi</Link> </li>
        </ul>
        <ul>
          <li><Link href="/admin/markalar">Ürün Markaları Listesi</Link> </li>
        </ul>
        <ul>
          <li><Link href="/admin/bize-ulasin">Bize Ulaşın Listesi</Link> </li>
        </ul>
        
        <ul>
          <li><Link href="/admin/projeler">Projeler Listesi</Link> </li>
        </ul>
      </div>
      <div className="mb-2">
        
      </div>
   </Layout>
  );
};

export default Home;