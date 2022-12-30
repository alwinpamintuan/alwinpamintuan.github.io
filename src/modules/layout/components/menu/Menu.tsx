import React, { useEffect } from "react";
import { toCamelCase } from "@utils/index";
import styles from "./Menu.module.css";

type Props = { links: Array<{ name: string; emoji: string }> };

export function Menu({ links }: Props) {
  const styleActiveLink = (target: any, link: string) => {
    const div = document.getElementById(`${link}Div`);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const links = Array.from(document.getElementsByClassName(styles.link));
    links?.forEach((link) => link.classList.remove(styles.activeLink));

    target.classList.add(styles.activeLink);
  };

  const handleLinkClick = (target: any, link: string) =>
    styleActiveLink(target, link);

  return (
    <nav className={styles.menu}>
      {links.map((link, i) => (
        <div
          className={styles.link}
          onClick={(e) =>
            handleLinkClick(e.currentTarget, toCamelCase(link.name))
          }
          tabIndex={0}
          id={`${toCamelCase(link.name)}Link`}
          key={i}
        >
          <span className={styles.linkEmoji}>{link.emoji}</span>
          <span className={styles.linkName}> {link.name}</span>
        </div>
      ))}
    </nav>
  );
}
