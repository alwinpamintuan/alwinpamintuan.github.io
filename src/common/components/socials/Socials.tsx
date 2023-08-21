import { classes } from "@utils/index";
import styles from "./Socials.module.css";

type Props = {};

export function Socials({}: Props) {
  const socials = [
    {
      title: "Github",
      link: "https://github.com/alwinpamintuan",
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/alwinpamintuan/",
    },
  ];

  return (
    <div className={styles.profiles}>
      {socials.map((social, index) => {
        return (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className={styles.link}
          >
            🔗 {social.title}
          </a>
        );
      })}
    </div>
  );
}
