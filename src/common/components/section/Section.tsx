import React from "react";
import styles from "./Section.module.css";

type Props = { children?: any; id?: string; justify?: any; header?: string };

export function Section({ children, id, justify, header }: Props) {
  return (
    <div className={styles.main} id={id} data-justify={justify}>
      {header ? <h1 className={styles.sectionHeader}>— {header}</h1> : null}
      {children}
    </div>
  );
}
