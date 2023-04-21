import React from "react";
import { Section } from "@components/index";
import styles from "./Contact.module.css";
import { contacts } from "public/data/contacts.json";

type Props = {};

export function Contact({}: Props) {
  return (
    <Section id={`ContactDiv`}>
      <h1>How can you reach me?</h1>
      <div className={styles.container}>
        {contacts.map((contact) => (
          <a href={contact.link} target="_blank" rel="noopener noreferrer">
            {contact.name}
          </a>
        ))}
      </div>
    </Section>
  );
}
