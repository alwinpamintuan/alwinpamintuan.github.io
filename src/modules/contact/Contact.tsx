import { Section } from "@components/index";
import styles from "./Contact.module.css";

import contactsJson from "public/data/contacts.json";
let contacts = contactsJson.contacts;

type Props = {};

export function Contact({}: Props) {
  return (
    <Section id={`ContactDiv`} header="My Contact Information">
      <h1>How can you reach me?</h1>
      <div className={styles.container}>
        {contacts.map((contact, index) => (
          <a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {contact.name}
          </a>
        ))}
      </div>
    </Section>
  );
}
