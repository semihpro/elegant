import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import path from "path";

interface Props {
  dirs: string[];
}

const Home: NextPage<Props> = ({ dirs }) => {

  return (
   <div>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <td>Aciklama</td>
            <td>Link</td>
            <td>Alt yazi</td>
            <td>Icon</td>
            <td>Icon Sirasi</td>
            <td>Islemler</td>
          </tr>
        </thead>
      </table>
    </div>
   </div>
  );
};

export default Home;