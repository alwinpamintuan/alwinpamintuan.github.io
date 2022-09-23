import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Affiliations.module.css";

type Props = {};

export function Affiliations({}: Props) {
  return (
    <Section id={`AffiliationsDiv`}>
      <h1>Affiliations</h1>
      <Placeholder />
    </Section>
  );
}
