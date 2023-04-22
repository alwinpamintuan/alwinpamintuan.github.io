import styles from "./Placeholder.module.css";

type Props = {};

// Reusable component
export const Placeholder = ({}: Props) => {
  return (
    <div className={styles.container}>
      <p>Oops! It seems that I haven&apos;t worked on this section yet.</p>
    </div>
  );
};
