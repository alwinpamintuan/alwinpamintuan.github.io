import { Section } from "@components/index";
import { classes, importAll } from "@utils/index";
import { useInView, InView } from "react-intersection-observer";
import Image from "next/image";
import styles from "./About.module.css";
import { monitorEventLoopDelay } from "perf_hooks";

type Props = {};

export function About({}: Props) {
  const current: object = importAll(
    require.context("public/assets/stack/current", false, /public\/.*\.(svg)$/)
  );

  const previous: object = importAll(
    require.context("public/assets/stack/others", false, /public\/.*\.(svg)$/)
  );

  return (
    <Section id={`AboutDiv`} justify="center" header="About Me">
      <InView
        as="div"
        onChange={(inView, entry) => {
          if (inView) {
            let icons = document.getElementsByClassName(
              styles.stackIconContainer
            );

            Array.from(icons).forEach((icon, index) => {
              const animDuration = 10000;

              const interval = animDuration / icons.length;
              const duration = animDuration / icons.length + 100;

              setTimeout(
                () => icon.classList.add(styles.inViewStackIconContainer),
                interval * index
              );

              setTimeout(
                () => icon.classList.remove(styles.inViewStackIconContainer),
                interval * index + duration
              );
            });
          }
        }}
        threshold={1}
        triggerOnce={true}
      >
        <div className={styles.stack}>
          <h2>I&apos;ve been using these a lot recently</h2>
          <div className={styles.row}>
            {Object.keys(current).map((icon, i) => {
              const name = icon.split("/").pop()?.split(".")[0];

              return (
                <div className={styles.stackIconContainer} key={i}>
                  <div className={styles.stackIcon}>
                    <Image
                      src={String(
                        current[icon as keyof Object][
                          "default" as keyof Object
                        ]["src" as keyof Object]
                      )}
                      height={36}
                      width={48}
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
                <div className={styles.stackIconContainer} key={i}>
                  <div className={styles.stackIcon}>
                    <Image
                      src={String(
                        previous[icon as keyof Object][
                          "default" as keyof Object
                        ]["src" as keyof Object]
                      )}
                      height={24}
                      width={36}
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
      </InView>
    </Section>
  );
}
