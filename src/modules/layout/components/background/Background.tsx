import React, { useEffect, useState } from "react";
import styles from "./Background.module.css";
import { classes } from "@utils/index";

type Props = {};

export function Background({}: Props) {
  return (
    <>
      <div className={classes(styles.blob, styles.blob1)}></div>
      <div className={classes(styles.blob, styles.blob2)}></div>
    </>
  );
}
