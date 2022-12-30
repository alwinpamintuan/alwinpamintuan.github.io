import React from "react";
import { Socials, Tilt, Section } from "@components/index";
import styles from "./About.module.css";
import { classes } from "@utils/index";

type Props = {};

export function About({}: Props) {
  return <Section id={`AboutDiv`} header={"Who am I?"}></Section>;
}
