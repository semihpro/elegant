import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@uploadthing/react/styles.css";
//import "bootstrap/dist/css/bootstrap.min.css"
import "../style/main.css";
import Layout from "../layout";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
