import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "ui";
import styles from "../styles/Home.module.css";
import { Amxr1, Amprocessaccess } from "components/svgs/jsx";

const pagetitle = "Next";

const Next: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pagetitle}</title>
        <meta name="description" content="A next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pagetitle}</h1>

        <div className={styles.grid}>
          <Card media={<Amxr1 />} />
          <Card media={<Amprocessaccess />} />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  );
};

export default Next;
