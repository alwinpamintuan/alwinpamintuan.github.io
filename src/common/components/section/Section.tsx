import React from "react";
import styles from "./Section.module.css";

type Props = { children?: any };

export function Section({ children }: Props) {
  return <div className={styles.main}>{children}</div>;
}
