import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Breadcrumb from "../../../../../components/Breadcrumb";
import prisma from "../../../../../lib/prisma";
import { Brand } from "@prisma/client";
import Swal from "sweetalert2";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const brands: Brand[] = await prisma.brand.findMany({});
    return { props: { brands } };
  } catch (error) {
    return { props: { brands: [] } };
  }
};

const BrandAdd: NextPage<{}> = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById("name") as HTMLInputElement;
      const result = await axios.post("/api/admin/brand", {
        name: name.value,
      });
      Swal.fire({
        title: "Kayıt İşle",
        text: "Kayit islemi gerceklestirildi",
        timer: 2000,
      });
      name.value = "";
    } catch (err) {
      Swal.fire(
        "islem gerceklestirilemedi",
        "Butun alanlari doldurdugunuzdan emin olunuz",
        "warning"
      );
    }
  };
  return (
    <>
      <div className="page-title">
        <Breadcrumb
          items={[
            { text: "Admin", link: "/admin" },
            { text: "Markalar", link: "/admin/markalar" },
            { text: "Ekle" },
          ]}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              id="name"
              required
            />
            <label htmlFor={"name"} className="form__label">
              Marka Adı
            </label>
          </div>
          <div className="form__group field">
            <button type="submit" className="btn btn-green">
              Ekle <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BrandAdd;
