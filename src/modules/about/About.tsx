import React from "react";
import { Socials, Tilt, Section } from "@components/index";
import styles from "./About.module.css";
import { classes } from "@utils/index";

type Props = {};

export function About({}: Props) {
  return (
    <Section id={`AboutDiv`} justify="center">
      <h4>Hello, I am</h4>
      <h1 className={styles.emphasis}>John Alwin Pamintuan</h1>
      <p>Data Engineer and Frontend Developer 🗃️👩‍💻</p>
      <Socials />
    </Section>
  );
}
