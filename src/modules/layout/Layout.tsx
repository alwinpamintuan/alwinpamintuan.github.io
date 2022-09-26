import React from "react";
import { Header } from "./components/";
import styles from "@styles/Layout.module.css";

type Props = {
  title?: string;
  children?: any;
};

export function Layout({ title, children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
