import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import Router from "next/router";
import { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div className="container">
        <div className="about">
          <div className="page-title">Hakkımızda</div>
          <div className="word-space">
            <div className="text-center margin-auto">
              <p>
                Daha yaşanabilir mekânlar için sektöründe toplam 15 yıllık bilgi
                birikimi ve tecrübesini son iki yıldır Oluşturduğu Uzman Kadro
                ile Elegant Avize ve Aydınlatma sistemleri olarak devam ettiren
                kuruluşumuz, sizler için dünyada ve ülkemizde imal edilen son
                derece kaliteli aydınlatma teknolojilerini bir araya getirerek
                satışa sunmaktadır.
              </p>
            </div>
            <div>
              <img
                src="images/hakkimizda/biz.jpg"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="word-space">
            <div className="text-center margin-auto">
              <p>
                Uzman kadrosu ile profesyonel aydınlatma teknolojilerinde en
                kaliteli ürünleri, en uygun fiyat koşullarında sizlere sunan
                firmamız, küresel anlamda ithalat ve ihracat projelerinde büyük
                başarılara her geçen gün bir yenisi ekliyor.
              </p>
              <p>
                Başta yerli üretim olmak üzere Dünya dekorasyon dizaynında
                hayata geçirilen en yeni modelleri sizler için yakından takip
                ederek anında sayfalarına taşıyan firmamız ürünlerini sürekli
                olarak güncel halde bulabilirsiniz.
              </p>
              <p>
                Piyasadaki saygın yeri ile saygıdeğer müşterilerinin takdirini
                kazanmayı bilen firmamızın her biri göz kamaştırıcı ürünlerini
                gönül rahatlığı ile sipariş verebilirsiniz.
              </p>
            </div>
            <div>
              <img
                src="images/hakkimizda/living-room.jpg"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="text-center word-space">
            <p>
              Satışını gerçekleştirdiği her ürünün bizzat garantisi olan
              kuruluşumuzun her mekânda kullanılmak üzere; Avize, Abajur,
              Modern, Klasik, Ayaklı aydınlatma sistemleri, Asmalı modeller,
              Ahşap ürünler,Metal Aydınlatmalar,Kristal modeller Gibi daha
              yüzlerce farklı dekoratif aydınlatma modelini web sayfamızda
              bulabilirsiniz.
            </p>
            <p>
              Özellikle iç piyasada kaliteli üretim gerçekleştiren firmalara
              projelerinde önceliği tanıyan kuruluşumuz ülkemizin kalkınma
              hamlesinde yer almanın büyük mutluluğunu yaşamaktadır.
            </p>
            <p>
              Elbette bu başarıda bizlere güvenerek birbirinden muhteşem, modern
              veya klasik tarzda kaliteli ürünlerimizi tercih eden siz
              saygıdeğer müşterilerimizin tartışılmaz katkısını da asla
              unutmuyoruz.
            </p>
            <p>
              Lütfen satış ve sipariş konuları da dahil olmak üzere sormak
              istediklerinizi web sayfamızda yer alan telefon numaralarından
              veya E-posta adresimiz üzerinden bizlere mutlaka aktarınız.
            </p>
            <p>
              Kendi sektörünün öncü kuruluşu Nirvana Aydınlatma sistemlerinin
              güler yüzlü personeli sizleri cevaplamaktan onur duyacaktır.
            </p>
            <p>Saygılarımızla.</p>
            <p>Elegant Avize ve Aydınlatma Sistemleri</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
