import React from "react";
import { Placeholder, Section } from "@components/index";
import styles from "./Projects.module.css";

type Props = {};

export function Projects({}: Props) {
  return (
    <Section id={`ProjectsDiv`} header={"What have I worked on?"}>
      <Placeholder />
    </Section>
  );
}
