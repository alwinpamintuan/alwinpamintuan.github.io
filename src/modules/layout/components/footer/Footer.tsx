import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

type Props = {};

export function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        🏃‍♂️💨 🦖
        <br />
        <br />
        &copy; {new Date().getFullYear()} John Alwin Pamintuan
      </p>
    </footer>
  );
}
