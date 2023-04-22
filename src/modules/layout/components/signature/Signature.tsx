import styles from "./Signature.module.css";
import contactsJson from "public/data/contacts.json";

type Props = { children?: any };

export function Signature({ children }: Props) {
  let contacts = contactsJson.contacts;
  let github = contacts.findIndex((obj) => obj.name.toLowerCase() == "github");

  return (
    <div className={styles.signature}>
      <a
        href={contacts[github].link}
        className={styles.copyright}
        target="_blank"
        rel="noopener noreferrer"
      >
        🏃‍♂️💨 🦖
      </a>
      {children}
    </div>
  );
}
