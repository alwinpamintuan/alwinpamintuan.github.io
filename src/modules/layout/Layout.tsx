import styles from "./Layout.module.css";
import { Header } from "./components/";

type Props = {
  title?: string;
  children?: any;
};

export function Layout({ title, children }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </>
  );
}
