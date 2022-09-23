import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Projects.module.css";

type Props = {};

export function Projects({}: Props) {
  return (
    <Section id={`ProjectsDiv`}>
      <h1>Projects</h1>
      <Placeholder />
    </Section>
  );
}
