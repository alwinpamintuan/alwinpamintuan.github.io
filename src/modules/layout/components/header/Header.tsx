import React, { useEffect, useState } from "react";
import Link from "next/link";
import { classes } from "@utils/index";
import styles from "./Header.module.css";
import others from "@components/placeholder/Placeholder.module.css";

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

  const handleLinkClick = (link: string) => {
    document.getElementById(link)?.scrollIntoView(true);
  };

  useEffect(() => {
    const animationEls = document.querySelectorAll(
      `.${others.rotating}, .${others.bobbing}`
    );
    if (openBurger) {
      animationEls?.forEach((el) => {
        el.classList.add("noanimation");
      });
    } else {
      animationEls?.forEach((el) => {
        el.classList.remove("noanimation");
      });
    }
  }, [openBurger]);

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.brand}>
          <span className={styles.alwin}>Alwin </span>
          <span className={styles.pamintuan}>Pamintuan</span>
        </a>
      </Link>

      <nav className={styles.menu} data-burger={openBurger}>
        {links.map((link) => (
          <a className={styles.link} onClick={() => handleLinkClick(link)}>
            {link}
          </a>
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
