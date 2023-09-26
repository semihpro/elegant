import { GetServerSideProps, NextPage } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import { ConnectUs } from "@prisma/client";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

export const getServerSideProps: GetServerSideProps = async () => {
  const connectUs: Array<ConnectUs> = await prisma.connectUs.findMany({});

  return {
    props: { connectUs },
  };
};

const Home: NextPage<{ connectUs: ConnectUs[] }> = ({ connectUs }) => {
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Silinen veri geri alinamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "iptal et",
      confirmButtonText: "Evet, devam et!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.delete(`/api/admin/connect-us/${id}`);
          await Swal.fire(
            "Silme basarili!",
            "Silme isleminiz gerceklestiridi.",
            "success"
          );
          window.location.reload();
        } catch (error) {
          await Swal.fire(
            "Silme basarisiz!",
            "Silme isleminiz gerceklestirilemedi.",
            "error"
          );
          console.log(`kayit basarisiz`, error);
        }
      }
    });
  };
  return (
    <>
      <div className="page-title">
        <Breadcrumb
          items={[{ text: "Admin", link: "/admin" }, { text: "Bize Ulasin" }]}
        />
      </div>
      <div className="search_and_add mt-2 mb-2">
        <input
          type="text"
          name="search_text"
          id="search_text"
          placeholder="Aranacak kelime"
        />
        <Link href={"/admin/bize-ulasin/ekle"} className="btn btn-green">
          Ekle <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
      </div>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">icon</div>
          <div className="col col-2">Aciklama</div>
          <div className="col col-3">Buton Metni</div>
          <div className="col col-4">Link</div>
          <div className="col col-5">İşlem</div>
        </li>
        {connectUs.map((item) => {
          return (
            <li className="table-row" key={item.id}>
              <div className="col col-1" data-label="Icon">
                <i className={`fa ${item.icon}`} aria-hidden="true"></i>
              </div>
              <div className="col col-2" data-label="Aciklama">
                {item.context}
              </div>
              <div className="col col-3" data-label="Buton Metni">
                {item.button_text}
              </div>
              <div className="col col-4" data-label="Link">
                {item.link}
              </div>
              <div className="col col-5" data-label="Islem">
                <Link href={`/admin/bize-ulasin/${item.id}`}>
                  <i
                    className="fa fa-pencil tooltip mouse-pointer"
                    aria-hidden="true"
                  >
                    {" "}
                    <span className="tooltiptext">Renk Düzenle</span>
                  </i>{" "}
                </Link>
                <i
                  onClick={() => handleDelete(item.id)}
                  className="fa fa-trash tooltip mouse-pointer color-red"
                  aria-hidden="true"
                >
                  {" "}
                  <span className="tooltiptext">Sil</span>
                </i>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
