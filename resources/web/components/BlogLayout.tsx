import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Loading } from "./";
import styles from "../styles/Home.module.css";

const BlogLayout = (props: {
  children: any;
  meta?: {
    title?: string;
    description?: string;
  };
}) => {
  const {
    children,
    meta = { title: "Title", description: "Sample description" },
  } = props;

  const router = useRouter();

  return (
    <>
      <Loading />
      <div className={styles.container}>
        <Head>
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.blog}>{children}</main>
      </div>
      <footer className={styles.footer}>
        <Button
          variant="outlined"
          startIcon={<IoMdArrowRoundBack />}
          onClick={() => router.back()}
          sx={{
            color: "var(--r-tertiary-color)",
            border: "1px solid var(--r-tertiary-color)",
            textTransform: "none",
            ":hover": {
              color: "var(--r-main-color)",
              border: "1px solid var(--r-main-color)",
            },
          }}
        >
          Back
        </Button>
      </footer>
    </>
  );
};

export default BlogLayout;
