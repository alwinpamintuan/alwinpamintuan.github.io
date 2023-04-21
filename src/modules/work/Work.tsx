import React from "react";
import { Placeholder, Section } from "@components/index";
import { Project } from "./components/project/Project";
import { projects } from "public/data/projects.json";
import styles from "./Work.module.css";

type Props = {};

export function Work({}: Props) {
  return (
    <Section id={`WorkDiv`}>
      {projects.map((project, index) => {
        return (
          <Project
            title={project.title}
            type={project.type}
            description={project.description}
            url={project.url}
            tech={project.tech}
            key={index}
          />
        );
      })}
    </Section>
  );
}
