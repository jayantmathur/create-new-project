import Head from "next/head";
import { HTMLProps } from "react";
import { Footer, Loading } from "./";
import styles from "../styles/Home.module.css";

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  children: any;
  meta?: {
    title?: string;
    description?: string;
  };
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    meta = { title: "Title", description: "Sample description" },
  } = props;
  return (
    <>
      <Loading />
      <div className={styles.container}>
        <Head>
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main} {...props}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
