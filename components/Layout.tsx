import React, { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">
      <div className="container">{props.children}</div>
    </div>
    <Footer />
  </div>
);

export default Layout;
