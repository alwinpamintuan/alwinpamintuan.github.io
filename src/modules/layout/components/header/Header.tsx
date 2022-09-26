import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Menu } from "../menu/Menu";
import { Signature } from "../signature/Signature";

type Props = {};

export function Header({}: Props) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const html = document.documentElement;
    setDark(!dark);
    html.toggleAttribute("data-dark");
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDarkMode) toggleDark();
  }, []);

  const links = [
    {
      name: "About",
      emoji: "👤",
    },
    {
      name: "Education",
      emoji: "🎓",
    },
    {
      name: "Experience",
      emoji: "💼",
    },
    {
      name: "Affiliations",
      emoji: "🤝",
    },
    {
      name: "Projects",
      emoji: "🎨",
    },
    {
      name: "Contact",
      emoji: "📞",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.brand}>
            <span className={styles.alwin}>Alwin </span>
            <span className={styles.pamintuan}>Pamintuan</span>
          </a>
        </Link>

        <Signature>
          <button
            className={styles.themeToggle}
            data-dark={dark}
            onClick={toggleDark}
          >
            💡
          </button>
        </Signature>
      </header>

      <Menu links={links} />
    </>
  );
}
