import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import path from "path";
import Link from "next/link";


interface Props {
  dirs: string[];
}

const Home: NextPage<Props> = ({ dirs }) => {

  return (
   <div>
    <div className="table-responsive">
      <div className="mb-2">
        <Link href="/admin/bize-ulasin"> Bize Ulaşın Sayfasını Düzenle</Link>
      </div>
      <div className="mb-2">
         <Link href="/admin/Projeler"> Projeler Sayfasını Düzenle</Link>
      </div>
      <div className="mb-2">
        <Link href="/admin/Urunler"> Ürünleri Düzenle</Link>
      </div>
      <div className="mb-2">
        
      </div>
      
     
      
    </div>
   </div>
  );
};

export default Home;