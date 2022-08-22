import React from "react";
import styles from "./Placeholder.module.css";
import { classes } from "@utils/index";
import { Socials } from "@components/socials";

type Props = {};

// Reusable component
export const Placeholder = ({}: Props) => {
  return (
    <>
      <h1>
        This site is under development.
        <span className={styles.rotating}>&nbsp;🛠️</span>
      </h1>
      <p>While waiting, check out my other profiles:</p>

      <Socials />
    </>
  );
};
