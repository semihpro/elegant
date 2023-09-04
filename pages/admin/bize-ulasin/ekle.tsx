import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import Breadcrumb from "../../../components/Breadcrumb";
import { ConnectUs } from "@prisma/client";
import Swal from 'sweetalert2'

const Home: NextPage = () => {
  const [connectUsData, setConnectUsData] = useState<Omit<ConnectUs, 'id'| 'createdAt' | 'updatedAt'>>({
    icon: "",
    context: "",
    button_text: "",
    link: ""
  });
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setConnectUsData({
      ...connectUsData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    try {
      const result = await axios.post('/api/admin/connect-us',{...connectUsData})
      Swal.fire({title:'Kayıt İşle', text:'Kayit islemi gerceklestirildi', timer:2000});
      setConnectUsData({
        icon: "",
        context: "",
        button_text: "",
        link: ""
      });
    } catch (err) {
      Swal.fire('islem gerceklestirilemedi', 'Butun alanlari doldurdugunuzdan emin olunuz','warning');
    }
  }
  return (
    <Layout>
      <div className="page-title">
        <Breadcrumb items={[{text:"Admin", link:"/admin"}, {text:"Bize Ulasin", link:"/admin/bize-ulasin"}, {text: "Ekle"}]}/>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="icon" name="icon" id='icon' onChange={handleInputChange} value={connectUsData.icon} required />
          <label htmlFor={"icon"} className="form__label">Icon</label>
        </div>
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
          <button type="submit" className="btn btn-green">Ekle <i className="fa fa-plus" aria-hidden="true"></i></button>  
        </div>
        </form>

      </div>
    </Layout>
  );
};


export default Home;