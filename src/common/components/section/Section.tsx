import React from "react";
import styles from "./Section.module.css";

type Props = { children?: any; id?: string; justify?: any };

export function Section({ children, id, justify }: Props) {
  return (
    <div className={styles.main} id={id} data-justify={justify}>
      {children}
    </div>
  );
}
