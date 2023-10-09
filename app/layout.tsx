"use client";
import React, { ReactNode, Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";
import "../style/main.css";
type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const session = getServerSession(options);

  return (
    <SessionProvider session={session}>
      <Header />
      <div className="layout">
        <div className="container">{children}</div>
      </div>
      <Footer />
    </SessionProvider>
  );
}

// const Layout: React.FC<Props> = (props) => (
//   <SessionProvider session={pageProps.session}>
//     <Header />
//     <div className="layout">
//       <div className="container">{props.children}</div>
//     </div>
//     <Footer />
//   </SessionProvider>
// );

//export default Layout;
