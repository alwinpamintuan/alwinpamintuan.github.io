import { useEffect, useState } from "react";
import { classes } from "@utils/index";
import styles from "./Background.module.css";

type Props = {};

export function Background({}: Props) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    console.log(window.navigator.userAgent);
    console.log(/Mobi/i.test(window.navigator.userAgent));
    setIsMobile(/Mobi/i.test(window.navigator.userAgent));
  }, []);

  return (
    <div className={styles.overlay}>
      <img
        src="/assets/background/yellow-blob.webp"
        className={classes(styles.blob1, styles.blob)}
      ></img>
      <img
        src="/assets/background/pink-blob.webp"
        className={classes(styles.blob2, styles.blob)}
      ></img>
    </div>
  );
}
