import React, { useEffect } from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Contact.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { aosConfig } from "@utils/index";

type Props = {};

export function Contact({}: Props) {
  useEffect(() => {
    AOS.init(aosConfig);
  }, []);

  return (
    <Section id={`ContactDiv`} header={"How can you reach me?"}>
      <div className={`${styles.container}`}>
        <h3 data-aos="fade-up">
          You can reach me through the following channels:
        </h3>
        <ul className={styles.contacts}>
          <li data-aos="fade-up" data-aos-delay="250">
            <a
              href="mailto: alwinpamintuan@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              💌 alwinpamintuan@gmail.com
            </a>
          </li>
        </ul>

        <p className={styles.note} data-aos="fade-left" data-aos-delay="500">
          That&apos;s it for now but I hope to add more soon!
        </p>
      </div>
    </Section>
  );
}
