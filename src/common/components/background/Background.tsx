import { useEffect, useState } from "react";
import { classes } from "@utils/index";
import styles from "./Background.module.css";
import { cursorTo } from "readline";

type Props = {
  section: String;
};

export function Background({ section }: Props) {
  const [isMobile, setIsMobile] = useState(true);
  const addBackgroundMouseInteraction = () => {
    const hasMobileUserAgent = /Mobi/i.test(window.navigator.userAgent);
    setIsMobile(hasMobileUserAgent);

    const cursor = document.querySelector(`.${styles.cursor}`) as HTMLElement;
    const slowBlob = document.querySelector(`.${styles.blob1}`) as HTMLElement;
    const fastBlob = document.querySelector(`.${styles.blob2}`) as HTMLElement;

    if (!hasMobileUserAgent && cursor && slowBlob && fastBlob) {
      document.addEventListener("mousemove", (e) => {
        let x = e.pageX;
        let y = e.pageY;

        cursor.style.top = `calc(${y}px)`;
        cursor.style.left = `calc(${x}px)`;

        fastBlob.style.top = `calc(${y}px / 6)`;
        fastBlob.style.left = `calc(${x}px / 6)`;

        slowBlob.style.top = `calc(${y}px / 24)`;
        slowBlob.style.left = `calc(${x}px / 24)`;
      });
    }
  };

  useEffect(() => {
    addBackgroundMouseInteraction();
  }, []);

  let background = null;
  switch (section) {
    case "hero":
      background = (
        <div className={styles.overlay}>
          <div className={styles.cursor} />
          <img
            src="/assets/background/yellow-blob.webp"
            className={classes(styles.blob1, styles.blob)}
          ></img>
        </div>
      );
      break;

    default:
      <></>;
  }

  return background;
}
