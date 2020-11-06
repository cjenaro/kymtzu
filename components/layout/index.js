import Head from "next/head";

import styles from "./layout.module.scss";

const Layout = ({ children, withHeader }) => (
  <div className={styles[withHeader ? "container-h" : "container"]}>
    <Head>
      <title>KymTzu</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {withHeader && <header className={styles.header}>KymTzu</header>}

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Por @cjenaro</footer>
  </div>
);

export default Layout;
