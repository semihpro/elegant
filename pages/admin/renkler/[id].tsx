import { NextPage } from "next";
import prisma from "../../../lib/prisma";
import { Color, Brand, Product } from "@prisma/client";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState } from "react";
import Swal from "sweetalert2";

type ProductProps = {
  colors: Array<Color>;
  brands: Array<Brand>;
  product: Product;
};
export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  const color = await prisma.color.findFirst({
    where: {
      id: Number(id) || -1,
    },
  });
  return {
    props: color,
  };
}
const Home: NextPage<Color> = (props) => {
  const [colorData, setcolorData] = useState(props);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setcolorData({
      ...colorData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await fetch(`/api/admin/color/${props.id}`, {
        method: `put`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colorData),
      });
      Swal.fire({
        title: "Guncelleme Islem Sonuc",
        text: "Islem basarili bir sekilde gerceklestirildi.",
        timer: 2000,
      });
    } catch (err) {
      Swal.fire(
        "islem gerceklestirilemedi",
        "Butun alanlari doldurdugunuzdan emin olunuz",
        "warning"
      );
    }

    // You can use an API call to send the data to the server or any other method to update the data.
  };

  return (
    <>
      <div className="page-title">
        <Breadcrumb
          items={[
            { text: "Admin", link: "/admin" },
            { text: "Renkler", link: "/admin/renkler" },
            { text: "Duzenle" },
          ]}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            required
            value={colorData.name}
            onChange={handleInputChange}
          />
          <label htmlFor={"name"} className="form__label">
            Renk Adı
          </label>
        </div>
        <div className="form__group field">
          <button type="submit" className="btn btn-green">
            Guncelle <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default Home;
