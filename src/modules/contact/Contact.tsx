import React from "react";
import { Section, Placeholder } from "@components/index";
import styles from "./Contact.module.css";

type Props = {};

export function Contact({}: Props) {
  return <Section id={`ContactDiv`} header={"How can you reach me?"}></Section>;
}
