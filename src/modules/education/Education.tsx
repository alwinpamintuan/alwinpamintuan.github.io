import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Education.module.css";

type Props = {};

export function Education({}: Props) {
  return (
    <Section id={`EducationDiv`}>
      <h1>Education</h1>
      <Placeholder />
    </Section>
  );
}
