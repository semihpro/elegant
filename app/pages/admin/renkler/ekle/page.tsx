import { NextPage } from "next";
import axios from "axios";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Swal from "sweetalert2";

const ColorAdd: NextPage<{}> = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById("name") as HTMLInputElement;
      const result = await axios.post("/api/admin/color", {
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
            { text: "Renkler", link: "/admin/renkler" },
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
              Renk Adı
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

export default ColorAdd;
