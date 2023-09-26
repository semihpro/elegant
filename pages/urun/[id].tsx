import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import Breadcrumb from "../../components/Breadcrumb";

type ProductProps = {
  id: number;
  name: string;
  description: string;
  imagePaths: string[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const post = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  const imagePaths = [];
  post.image_key1 && imagePaths.push(post.image_path1);
  post.image_key2 && imagePaths.push(post.image_path2);
  post.image_key3 && imagePaths.push(post.image_path3);
  post.image_key4 && imagePaths.push(post.image_path4);
  post.image_key5 && imagePaths.push(post.image_path5);
  const product: ProductProps = {
    id: post.id,
    name: post.name,
    description: `Evinizin zarif ve aydınlık bir atmosfer kazanması için ideal bir tercih olan beyaz renkli avizemiz, estetik ve fonksiyonelliği mükemmel bir şekilde bir araya getiriyor. Zarafetin ve sadeliğin sembolü olan beyazın yanı sıra sıcak ve davetkar bir ışık yayarak mekanınızı aydınlatır.

    Bu avize, beyaz ve sarı renk seçenekleriyle sunulur, böylece iç mekan dekorunuzla mükemmel bir uyum sağlar. Geniş alanlar için özellikle uygundur ve oturma odaları veya salonlar gibi büyük yaşam alanlarını mükemmel bir şekilde tamamlar. Şıklığı ve işlevselliği bir araya getiren bu beyaz avize, evinizin atmosferini dönüştürmek için mükemmel bir seçenektir. Evinizdeki güzellik ve aydınlık için en iyi tercihiniz.`,
    imagePaths: imagePaths,
  };
  return {
    props: product,
  };
};

const Post: React.FC<ProductProps> = (props) => {
  const [selectedImage, setSelectedImage] = React.useState(props.imagePaths[0]);
  return (
    <>
      <div className="container">
        <div className="page-title">
          <Breadcrumb
            items={[{ text: "Urunler", link: "/" }, { text: "Urun Detayi" }]}
          />
        </div>
        <div className="product">
          <div className="image-container">
            <div className="image-list">
              <ul>
                {props.imagePaths.map((imagePath, index) => (
                  <li key={index} className="cursor-pointer">
                    <img
                      src={imagePath}
                      alt={props.name}
                      onMouseOver={(e) => setSelectedImage(imagePath)}
                    />
                  </li>
                ))}
                <li></li>
              </ul>
            </div>
            <div className="image-show">
              <img src={selectedImage} alt={props.name} />
            </div>
            <div className="float-clear"></div>
            <div className="image-fullscreen"></div>
          </div>
          <div className="product-information">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>
              <strong>Color:</strong>
              <span>props.color</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
