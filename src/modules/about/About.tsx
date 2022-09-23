import React from "react";
import { Socials, Tilt, Section } from "@components/index";
import styles from "./About.module.css";
import { classes } from "@utils/index";

type Props = {};

export function About({}: Props) {
  return (
<<<<<<< HEAD
    <Section>
=======
    <Section id={`AboutDiv`} justify="center">
>>>>>>> ui-dev
      <Tilt
        options={{
          speed: 10,
        }}
        className={styles.card}
<<<<<<< HEAD
        id={`AboutDiv`}
=======
>>>>>>> ui-dev
      >
        <h4>Hello, I am</h4>
        <h1 className={styles.popout}>John Alwin Pamintuan</h1>
        <p>Computer Science Graduate 🎓</p>
        <Socials />
      </Tilt>
    </Section>
  );
}
