import { useEffect, useState } from "react";
import Layout from "../components/Layout";
function returnAfter5SecondPromise(): Promise<Number[]> {
  return new Promise<any>((resolve) => {
    setTimeout(() => resolve([1, 2, 3]), 5000);
  });
}

export default function test() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    returnAfter5SecondPromise().then((bring) => setData(bring));
  });
  return (
    <>
      <Layout>
        {data.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </Layout>
    </>
  );
}
