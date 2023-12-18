import { useEffect, useState } from "react";
import { classes } from "@utils/index";
import styles from "./Background.module.css";

type Props = {
  section: String;
};

export function Background({ section }: Props) {
  const [isMobile, setIsMobile] = useState(true);
  const addBackgroundMouseInteraction = () => {
    const hasMobileUserAgent = /Mobi/i.test(window.navigator.userAgent);
    setIsMobile(hasMobileUserAgent);

    const bigBlob = document.querySelector(`.${styles.bigBlob}`) as HTMLElement;

    if (bigBlob) {
      document.addEventListener("mousemove", (e) => {
        let x = e.pageX;
        let y = e.pageY;

        bigBlob.style.top = `calc(${y}px / 12 + 50vmax)`;
        bigBlob.style.left = `calc(${x}px / 24)`;
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
          <img
            src="/assets/background/yellow-blob.webp"
            className={classes(styles.bigBlob, styles.blob)}
          ></img>
        </div>
      );
      break;

    default:
      <></>;
  }

  return background;
}
