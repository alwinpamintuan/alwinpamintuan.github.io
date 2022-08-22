import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Socials } from "@components/socials";

type Props = {};

export function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>🏃‍♂️💨 🦖</p>
    </footer>
  );
}
