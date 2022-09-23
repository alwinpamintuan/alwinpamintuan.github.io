import React from "react";
import styles from "./Placeholder.module.css";
import { classes } from "@utils/index";
import { Socials } from "@components/index";

type Props = {};

// Reusable component
export const Placeholder = ({}: Props) => {
  return (
    <div className={styles.container}>
      <h3>
        This site is under development.
        <span className={styles.rotating}>&nbsp;🛠️</span>
      </h3>

      <p>While waiting, check out my other profiles:</p>
      <Socials />
    </div>
  );
};
