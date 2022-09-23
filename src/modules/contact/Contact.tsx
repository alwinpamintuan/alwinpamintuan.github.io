import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Contact.module.css";

type Props = {};

export function Contact({}: Props) {
  return (
    <Section id={`ContactDiv`}>
      <h1>Contact</h1>
      <Placeholder />
    </Section>
  );
}
