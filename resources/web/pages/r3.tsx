import type { NextPage } from "next";
import Head from "next/head";
import R3Sample from "../components/R3Sample";
import styles from "../styles/Home.module.css";

const pagetitle = "R3";

const Home: NextPage = () => {
  return (
    <div className={styles.fitspace}>
      <Head>
        <title>{pagetitle}</title>
        <meta name="description" content="A next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <R3Sample />
    </div>
  );
};

export default Home;
