import styles from "./Signature.module.css";

type Props = { children?: any };

export function Signature({ children }: Props) {
  return (
    <div className={styles.signature}>
      <p className={styles.copyright}>🏃‍♂️💨 🦖</p>
      {children}
    </div>
  );
}
