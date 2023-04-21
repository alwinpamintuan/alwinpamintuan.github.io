import React from "react";
import { Placeholder, Section } from "@components/index";
import styles from "./Work.module.css";

type Props = {};

export function Work({}: Props) {
  return (
    <Section id={`WorkDiv`} header={"Where have I been involved?"}>
      <Placeholder />
    </Section>
  );
}
