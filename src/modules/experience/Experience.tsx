import React from "react";
import { Placeholder, Section } from "@components/index";
import styles from "./Experience.module.css";

type Props = {};

export function Experience({}: Props) {
  return (
    <Section id={`ExperienceDiv`} header={"Where have I been involved?"}>
      <Placeholder />
    </Section>
  );
}
