import React from "react";
import { Section } from "@components/index";
import { Project } from "./components/project/Project";

import projectsJson from "public/data/projects.json";
let projects = projectsJson.projects;

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
