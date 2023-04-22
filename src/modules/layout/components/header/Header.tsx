import { links } from "@utils/menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "../menu/Menu";
import { Signature } from "../signature/Signature";
import styles from "./Header.module.css";

type Props = {};

export function Header({}: Props) {
  const [dark, setDark] = useState(true);

  const toggleLight = () => {
    const html = document.documentElement;
    setDark(!dark);
    html.toggleAttribute("data-light");
  };

  useEffect(() => {
    const prefersLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (prefersLightMode) toggleLight();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.brand}>
            <span className={styles.alwin}>alwin</span>
            <span className={styles.pamintuan}>pamintuan</span>
          </a>
        </Link>

        <Menu links={links} />

        <Signature>
          <button
            className={styles.themeToggle}
            data-dark={dark}
            onClick={toggleLight}
          >
            💡
          </button>
        </Signature>
      </header>
    </>
  );
}
