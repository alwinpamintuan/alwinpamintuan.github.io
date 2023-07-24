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
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.flex}
    >
      <div className={styles.projectContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.type}>{type}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.row}>
          {tech.map((tech, index) => {
            return (
              <p className={styles.tech} key={index}>
                {tech}
              </p>
            );
          })}
        </div>
      </div>
    </a>
  );
}
