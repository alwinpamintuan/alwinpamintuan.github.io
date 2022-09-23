import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Experience.module.css";

type Props = {};

export function Experience({}: Props) {
  return (
    <Section id={`ExperienceDiv`}>
      <h1>Experience</h1>
      <Placeholder />
    </Section>
  );
}
