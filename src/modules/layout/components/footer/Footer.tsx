import React from "react";
import styles from "./Footer.module.css";
import { Socials } from "@components/index";

type Props = {};

export function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>🏃‍♂️💨 🦖</p>
    </footer>
  );
}
