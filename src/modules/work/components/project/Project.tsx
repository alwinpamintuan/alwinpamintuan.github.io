import React from "react";
import { Placeholder, Section } from "@components/index";
import styles from "./Project.module.css";

type Props = {
  title: string;
  type: string;
  description: string;
  url: string;
  tech: Array<string>;
};

export function Project({ title, description, url, tech }: Props) {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
