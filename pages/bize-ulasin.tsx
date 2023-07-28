import React from "react";
import Layout from "../components/Layout";
import { PostProps } from "../components/Post";

const Post: React.FC<PostProps> = (props) => {
  return (
    <Layout>
        <div className="page-title">
            Gallery
        </div>
        <div className="grid-container">
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-envelope-o m-auto" aria-hidden="true"></i>
                </div>
                <p>Teklif Almak İstiyorum</p>
                <button className="btn btn-gray" type="button">Bize Mail atın</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                </div>
                <p>Bire bir iletişim kurmak istiyorum</p>
                <button className="btn btn-gray" type="button">Whatsup Kanalımız</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
                <p>Instagram Sayfamızı takip edebilirsiniz</p>
                <button className="btn btn-gray" type="button">Instagram Kanalımız</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </div>
                <p>Facebook Sayfamızı takip edebilirsiniz</p>
                <button className="btn btn-gray" type="button">Facebook Kanalımız</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-volume-control-phone" aria-hidden="true"></i>
                </div>
                <p>0534 961 32 65</p>
                <button className="btn btn-gray" type="button">Telefon Numaramız</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                </div>
                <p>Online Alışveriş</p>
                <button className="btn btn-gray" type="button">Trendyol'da Ürünlerimiz</button>
            </div>
            <div className="card text-center">
                <div className="icon-circle bg-gray">
                    <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                </div>
                <p>Online Alışveriş</p>
                <button className="btn btn-gray" type="button">Hepsi Burada'da Ürünlerimiz</button>
            </div>
           
        </div>
    </Layout>
  );
};

export default Post;
