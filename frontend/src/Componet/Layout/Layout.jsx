import React from "react";
import Header from "./Header";

import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className=" ">
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className=" z-0 ">{children}</main>
           
        </div>
    );
};

export default Layout;
