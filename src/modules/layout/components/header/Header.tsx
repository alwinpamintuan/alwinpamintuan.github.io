import React, { useEffect, useState } from "react";
import { HTMLVanillaTiltElement } from "vanilla-tilt";
import Link from "next/link";
import { classes, toCamelCase } from "@utils/index";
import styles from "./Header.module.css";

type Props = {};

export function Header({}: Props) {
  const [openBurger, setOpenBurger] = useState(false);

  const links = [
    "About",
    "Education",
    "Work Experience",
    "Affiliations",
    "Projects",
    "Contact",
  ];

  const styleActiveLink = (target: any, link: string) => {
    const div = document.getElementById(link);
    div?.scrollIntoView(true);

    const links = Array.from(document.getElementsByClassName(styles.link));
    links?.forEach((link) => link.classList.remove(styles.activeLink));

    target.classList.add(styles.activeLink);
  };

  const handleLinkClick = (target: any, link: string) =>
    styleActiveLink(target, link);

  const handleLinkKeyPress = (event: any, link: string) => {
    if (event.charCode === 13) styleActiveLink(event.currentTarget, link);
  };

  // Remove vanilla-tilt on portrait devices
  useEffect(() => {
    const portrait = window.matchMedia("(orientation: portrait)");

    addEventListener("load", (e) => {
      if (portrait.matches) {
        const tilt = document.querySelector(
          ".vanillaTilt"
        ) as HTMLVanillaTiltElement;
        tilt?.vanillaTilt?.destroy();
        tilt.style.willChange = "unset";
      }
    });

    const aboutLink = document.querySelector("#About");
    styleActiveLink(aboutLink, toCamelCase("About"));
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.brand}>
          <span className={styles.alwin}>Alwin </span>
          <span className={styles.pamintuan}>Pamintuan</span>
        </a>
      </Link>

      <nav className={styles.menu} data-burger={openBurger}>
        {links.map((link, i) => (
          <Link href="/" key={i}>
            <a
              className={styles.link}
              onClick={(e) => handleLinkClick(e.currentTarget, link)}
              onKeyPress={(e) => handleLinkKeyPress(e, link)}
              tabIndex={0}
              id={toCamelCase(link)}
            >
              {link}
            </a>
          </Link>
        ))}
      </nav>

      <label className={styles.burgerIcon} data-burger={openBurger}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={(e) => {
            setOpenBurger(e.target.checked);
          }}
        />

        <div className={styles.burgerLines}>
          <span className={classes(styles.line, styles.line1)} />
          <span className={classes(styles.line, styles.line2)} />
          <span className={classes(styles.line, styles.line3)} />
        </div>
      </label>
    </header>
  );
}
