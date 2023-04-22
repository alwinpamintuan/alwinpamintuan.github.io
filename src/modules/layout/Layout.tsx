import styles from "./Layout.module.css";
import { Background, Header } from "./components/";

type Props = {
  title?: string;
  children?: any;
};

export function Layout({ title, children }: Props) {
  return (
    <>
      <Background />
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </>
  );
}
