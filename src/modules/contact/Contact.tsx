import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Contact.module.css";

type Props = {};

export function Contact({}: Props) {
  return (
    <Section id={`ContactDiv`} header={"How can you reach me?"}>
      <div className={`${styles.container}`}>
        <h3>You can reach me through the following channels:</h3>
        <ul className={styles.contacts}>
          <li>
            <a
              href="mailto: alwinpamintuan@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              💌 alwinpamintuan@gmail.com
            </a>
          </li>
        </ul>

        <p className={styles.note}>
          That&apos;s it for now but I might add more soon!
        </p>
      </div>
    </Section>
  );
}
