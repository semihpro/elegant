import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@uploadthing/react/styles.css";
//import "bootstrap/dist/css/bootstrap.min.css"
import "../style/main.css"
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
