import React from "react";
import Layout from "../components/Layout";
import { ConnectUs } from "@prisma/client";
import { PostProps } from "../components/Post";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

// Serverside props
export const getServerSideProps: GetServerSideProps = async () => {
  const connectUs: Array<ConnectUs> = await prisma.connectUs.findMany({});
  return {
    props: { connectUs },
  };
};

const Post: React.FC<{ connectUs: ConnectUs[] }> = (props) => {
  return (
    <Layout>
      <div className="page-title">Bize Ulasin</div>
      <div className="grid-container">
        {props.connectUs.map((connectUs) => (
          <div className="card text-center" key={connectUs.id}>
            <div className="icon-circle bg-gray">
              <i className={connectUs.icon} aria-hidden="true"></i>
            </div>
            <p>{connectUs.context}</p>
            <button className="btn btn-gray" type="button">
              {connectUs.button_text}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Post;
