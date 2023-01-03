import React from "react";
import Header from "../header";

const SiteLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-contents">{children}</main>
    </>
  );
};

export default SiteLayout;
