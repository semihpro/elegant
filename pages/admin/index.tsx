import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";

interface Props {
  dirs: string[];
}

const Home: NextPage<Props> = ({ dirs }) => {
  const linkList = [
    {
      text: "Ürün Listesi",
      link: "/admin/urunler",
    },
    {
      text: "Ürün Renkleri Listesi",
      link: "/admin/renkler",
    },
    {
      text: "Ürün Markaları Listesi",
      link: "/admin/markalar",
    },
    {
      text: "Bize Ulaşın Listesi",
      link: "/admin/bize-ulasin",
    },
    {
      text: "Fotograflar",
      link: "/admin/fotograflar",
    },
  ];
  return (
    <>
      <div className="page-title">
        <Breadcrumb items={[{ text: "Admin", link: "/admin" }]} />
      </div>

      <div className="container">
        <ul className="responsive-table">
          {linkList.map((item) => {
            return (
              <Link href={item.link}>
                <li className="table-row" key={item.text}>
                  <div className="col col-1" data-label="Brand Name">
                    {item.text}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="mb-2"></div>
    </>
  );
};

export default Home;
