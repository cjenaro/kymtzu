import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.scss";

const Layout = ({ children, withHeader, pathname }) => (
  <div className={styles[withHeader ? "container-h" : "container"]}>
    <Head>
      <title>KymTzu</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {withHeader && <header className={styles.header}>KymTzu</header>}

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      {pathname !== "/" ? <Link href="/">&larr; al incio</Link> : null}
      <p>Por @cjenaro</p>
    </footer>
  </div>
);

export default Layout;
