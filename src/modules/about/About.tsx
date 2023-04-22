import { Section } from "@components/index";
import { classes, importAll } from "@utils/index";
import Image from "next/image";
import styles from "./About.module.css";
import ashWebp from "public/assets/content/ash.webp";
import mtrWebp from "public/assets/content/meet-the-robinsons.webp";

type Props = {};

export function About({}: Props) {
  const current: object = importAll(
    require.context("public/assets/stack/current", false, /public\/.*\.(svg)$/)
  );

  const previous: object = importAll(
    require.context("public/assets/stack/others", false, /public\/.*\.(svg)$/)
  );

  return (
    <Section id={`AboutDiv`}>
      <div className={classes(styles.row, styles.mainRow)}>
        <div className={classes(styles.column, styles.intro)}>
          <h1>Who am I?</h1>
          <div>
            <Image
              className={styles.img}
              src={ashWebp}
              alt="Ash Ketchum (Pokemon) GIF from Giphy"
              width={217}
              height={97}
              loading="lazy"
            />
            <Image
              className={styles.img}
              src={mtrWebp}
              alt="Keep moving forward. (Meet the Robinsons) GIF from Tenor"
              width={217}
              height={97}
              loading="lazy"
            />
          </div>

          <div className={styles.lines}>
            <blockquote
              cite="Pokémon Theme (Gotta catch 'em all!)"
              className={styles.quote}
            >
              <i>I wanna be the very best like no one ever was</i>
            </blockquote>
            <p>but I do not know at what yet so I guess we</p>
            <blockquote cite="Meet the Robinsons" className={styles.quote}>
              <i>keep moving forward</i>.
            </blockquote>
          </div>
        </div>

        <div className={classes(styles.column, styles.techstack)}>
          <div>
            <h1>I use these for my work</h1>
            <div className={styles.row}>
              {Object.keys(current).map((icon, i) => {
                return (
                  <Image
                    src={String(
                      current[icon as keyof Object]["default" as keyof Object][
                        "src" as keyof Object
                      ]
                    )}
                    height={48}
                    width={48}
                    key={i}
                    alt={String(current[icon as keyof Object])}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h1>But I also love</h1>
            <div className={styles.row}>
              {Object.keys(previous).map((icon, i) => {
                return (
                  <Image
                    src={String(
                      previous[icon as keyof Object]["default" as keyof Object][
                        "src" as keyof Object
                      ]
                    )}
                    height={32}
                    width={32}
                    key={i}
                    alt={String(current[icon as keyof Object])}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
