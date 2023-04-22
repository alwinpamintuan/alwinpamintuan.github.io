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
    <>
      <div
        className={classes(
          styles.blob,
          styles.blob1,
          isMobile ? "" : styles.blob1anim
        )}
      ></div>
      <div
        className={classes(
          styles.blob,
          styles.blob2,
          isMobile ? "" : styles.blob2anim
        )}
      ></div>
    </>
  );
}
