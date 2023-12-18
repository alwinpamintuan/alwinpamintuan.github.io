import { Background, Section, Socials } from "@components/index";
import styles from "./Hero.module.css";

type Props = {};

export function Hero({}: Props) {
  return (
    <Section id={`HeroDiv`} justify="center">
      <Background section="hero" />
      <div className={styles.main}>
        <p>
          <span className={styles.hello}>Hello! &nbsp;</span>
          <span className={styles.iam}>I am</span>
        </p>
        <h1 className={styles.emphasis}>John Alwin Pamintuan</h1>
        <p className={styles.subtitle}>
          Data Engineer and Tech Enthusiast 🗃️👩‍💻
        </p>
      </div>

      <Socials />
    </Section>
  );
}
