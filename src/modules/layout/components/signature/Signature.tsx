import React from "react";
import styles from "./Signature.module.css";

type Props = {};

export function Signature({}: Props) {
  return (
    <div className={styles.signature}>
      <p className={styles.copyright}>🏃‍♂️💨 🦖</p>
    </div>
  );
}
