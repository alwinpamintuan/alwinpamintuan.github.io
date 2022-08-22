import React from "react";
import Head from "next/head";
import { Header, Footer } from "./components/";
import styles from "@styles/Layout.module.css";

type Props = {
  title?: string;
  children?: any;
};

export function Layout({ title, children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {title ? `${title} | Alwin Pamintuan.` : "Alwin Pamintuan | 🏃‍♂️💨 🦖"}
        </title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.main}>{children}</div>

      <Footer />
    </div>
  );
}
