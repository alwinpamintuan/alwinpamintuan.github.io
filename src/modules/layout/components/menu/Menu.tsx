import { toCamelCase } from "@utils/index";
import { useEffect } from "react";
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

  useEffect(() => {
    // Menu active link on scroll
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav div");
    navLi.forEach((link, index) => {
      link.classList.add(sections[index].getAttribute("id")!);
    });

    window.onscroll = () => {
      var current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop + 60) {
          current = section.getAttribute("id")!;
        }
      });

      navLi.forEach((li) => {
        li.classList.remove(styles.activeLink);
        if (li.classList.contains(current)) {
          li.classList.add(styles.activeLink);
        }
      });
    };
  }, []);

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
