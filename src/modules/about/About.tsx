import { Section } from "@components/index";
import { classes, importAll } from "@utils/index";
import Image from "next/image";
import styles from "./About.module.css";

type Props = {};

export function About({}: Props) {
  const current: object = importAll(
    require.context("public/assets/stack/current", false, /public\/.*\.(svg)$/)
  );

  const previous: object = importAll(
    require.context("public/assets/stack/others", false, /public\/.*\.(svg)$/)
  );

  console.log(current);

  return (
    <Section id={`AboutDiv`} justify="center" header="About Me">
      <div className={styles.stack}>
        <h2>I've been using these a lot recently</h2>
        <div className={styles.row}>
          {Object.keys(current).map((icon, i) => {
            const name = icon.split("/").pop()?.split(".")[0];

            return (
              <div className={styles.stackIconContainer}>
                <div className={styles.stackIcon}>
                  <Image
                    src={String(
                      current[icon as keyof Object]["default" as keyof Object][
                        "src" as keyof Object
                      ]
                    )}
                    height={36}
                    width={48}
                    key={i}
                    alt={name}
                    loading="lazy"
                  />
                  <p className={styles.iconName}>{name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.stack}>
        <h2>but for other projects I have also used</h2>
        <div className={styles.row}>
          {Object.keys(previous).map((icon, i) => {
            const name = icon.split("/").pop()?.split(".")[0];

            return (
              <div className={styles.stackIconContainer}>
                <div className={styles.stackIcon}>
                  <Image
                    src={String(
                      previous[icon as keyof Object]["default" as keyof Object][
                        "src" as keyof Object
                      ]
                    )}
                    height={24}
                    width={36}
                    key={i}
                    alt={name}
                    loading="lazy"
                  />
                  <p className={styles.iconName}>{name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
