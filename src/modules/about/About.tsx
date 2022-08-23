import React from "react";
import { Placeholder, Socials, Tilt } from "@components/index";
import styles from "@styles/About.module.css";
import layout from "@styles/Layout.module.css";
import { classes } from "@utils/index";

type Props = {};

export function About({}: Props) {
  return (
    <>
      <Tilt
        options={{
          speed: 300,
          glare: true,
          "max-glare": 0.6,
          "full-page-listening": true,
        }}
        className={classes(styles.card, "animated")}
      >
        <h4>Hello, I am</h4>
        <h1>John Alwin Pamintuan</h1>
        <p>Computer Science Graduate 🎓</p>
        <Socials></Socials>
      </Tilt>

      <div className={layout.scroll}>
        <Placeholder />
      </div>
    </>
  );
}
