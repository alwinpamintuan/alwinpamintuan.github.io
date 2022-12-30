import React from "react";
import styles from "./Placeholder.module.css";

type Props = {};

// Reusable component
export const Placeholder = ({}: Props) => {
  return (
    <div className={styles.container}>
      Oops! It seems that I haven't worked on this section yet.
    </div>
  );
};
