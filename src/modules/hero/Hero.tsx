import React from "react";
import { Socials, Tilt, Section } from "@components/index";
import styles from "./Hero.module.css";
import { classes } from "@utils/index";

type Props = {};

export function Hero({}: Props) {
  return (
    <Section id={`HeroDiv`} justify="center">
      <h4>Hello, I am</h4>
      <h1 className={styles.emphasis}>John Alwin Pamintuan</h1>
      <p>Data Engineer and Frontend Developer 🗃️👩‍💻</p>
      <Socials />
    </Section>
  );
}
