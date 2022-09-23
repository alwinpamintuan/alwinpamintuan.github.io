import React, { useState, useEffect } from "react";
import { HTMLVanillaTiltElement } from "vanilla-tilt";
import { classes, toCamelCase } from "@utils/index";
import Link from "next/link";
import styles from "./Menu.module.css";

type Props = { links: Array<{ name: string; emoji: string }> };

export function Menu({ links }: Props) {
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

  useEffect(() => {
    const aboutLink = document.querySelector("#AboutLink");
    styleActiveLink(aboutLink, toCamelCase("About"));
  }, []);

  return (
    <nav className={styles.menu}>
      {links.map((link, i) => (
        <a
          className={styles.link}
          onClick={(e) =>
            handleLinkClick(e.currentTarget, toCamelCase(link.name))
          }
          onKeyPress={(e) => handleLinkKeyPress(e, toCamelCase(link.name))}
          tabIndex={0}
          id={`${toCamelCase(link.name)}Link`}
          key={i}
        >
          <span className={styles.linkEmoji}>{link.emoji}</span>
          <span className={styles.linkName}> {link.name}</span>
        </a>
      ))}
    </nav>
  );
}
