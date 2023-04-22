import styles from "./Project.module.css";

type Props = {
  title: string;
  type: string;
  description: string;
  url: string;
  tech: Array<string>;
};

export function Project({ title, type, description, url, tech }: Props) {
  return (
    <a
      className={styles.projectContainer}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.type}>{type}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.tech}>{tech.join(", ")}</p>
    </a>
  );
}
