import React from "react";
import { Header, Background } from "./components/";
import styles from "./Layout.module.css";

type Props = {
  title?: string;
  children?: any;
};

export function Layout({ title, children }: Props) {
  return (
    <>
      <Background />
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </>
  );
}
