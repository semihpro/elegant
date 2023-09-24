import React, { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">
      <div className="container">
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </div>
    </div>
    <Footer />
  </div>
);

export default Layout;
