import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import prisma from "../../../lib/prisma";
import { ConnectUs } from "@prisma/client";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState } from "react";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  const connectUs = await prisma.connectUs.findFirst({
    where: {
      id: Number(id) || -1,
    }
  });
  return {
    props:  connectUs
  };
}
const Home: NextPage<ConnectUs> = (props) => {
  const [connectUsData, setConnectUsData] = useState(props);
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setConnectUsData({
      ...connectUsData,
      [name]: value,
    });
  };
  const handleSubmit = async (e:any) => {

    e.preventDefault();
    try {
      const result = await fetch(`/api/admin/connect-us/${props.id}`, {
        method:`put`, 
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(connectUsData)});
      Swal.fire({title:'Guncelleme Islem Sonuc', text:'Islem basarili bir sekilde gerceklestirildi.', timer:2000});
    } catch (err) {
      Swal.fire('islem gerceklestirilemedi', 'Butun alanlari doldurdugunuzdan emin olunuz','warning');
    }
    
    // You can use an API call to send the data to the server or any other method to update the data.
  };
  
  return (
    <Layout>
      <div className="page-title">
      <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Bize Ulasin", link:"/admin/bize-ulasin"}, {text: "Duzenle"}]}/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="icon" name="icon" id='icon' onChange={handleInputChange} value={connectUsData.icon} required />
          <label htmlFor={"icon"} className="form__label">Icon</label>
        </div>
        <i className={`fa ${connectUsData.icon}`} style={{fontSize: '2em'}} aria-hidden="true"></i>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="context" name="context" id='context' onChange={handleInputChange} value={connectUsData.context} required />
          <label htmlFor={"context"} className="form__label">context</label>
        </div>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="Buon metni" name="button_text" id='button_text' onChange={handleInputChange} value={connectUsData.button_text} required />
          <label htmlFor={"context"} className="form__label">Buton metni</label>
        </div>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="link" name="link" id='button_text' onChange={handleInputChange} value={connectUsData.link} required />
          <label htmlFor={"context"} className="form__label">link</label>
        </div>
          <div className="form__group field">
            <button type="submit" className="btn btn-green">Guncelle <i className="fa fa-refresh" aria-hidden="true"></i></button>  
          </div>
      </form>
    </Layout>  
  
  );
};

export default Home;