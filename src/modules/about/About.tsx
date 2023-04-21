import React from "react";
import { Socials, Section, Placeholder } from "@components/index";
import styles from "./About.module.css";
import { classes } from "@utils/index";

type Props = {};

export function About({}: Props) {
  return (
    <Section id={`AboutDiv`} header={"Who am I?"}>
      <blockquote cite="Pokémon Theme (Gotta catch 'em all!)">
        <i>I wanna be the very best like no one ever was.</i>
      </blockquote>
    </Section>
  );
}
