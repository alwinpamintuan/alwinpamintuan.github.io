import { classes } from "@utils/index";
import styles from "./Background.module.css";

type Props = {};

export function Background({}: Props) {
  return (
    <>
      <div className={classes(styles.blob, styles.blob1)}></div>
      <div className={classes(styles.blob, styles.blob2)}></div>
    </>
  );
}
