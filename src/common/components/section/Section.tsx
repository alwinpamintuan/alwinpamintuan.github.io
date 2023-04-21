import React, { useEffect } from "react";
import styles from "./Section.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { aosConfig } from "@utils/index";

type Props = { children?: any; id?: string; justify?: any; header?: string };

export function Section({ children, id, justify, header }: Props) {
  useEffect(() => {
    AOS.init(aosConfig);
  }, []);

  return (
    <section className={styles.main} id={id} data-justify={justify}>
      {header ? (
        <h1 className={styles.sectionHeader} data-aos="fade-right">
          {header}
        </h1>
      ) : null}
      {children}
    </section>
  );
}
