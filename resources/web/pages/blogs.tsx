import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { marked } from "marked";

import styles from "../styles/Home.module.css";

const pagetitle = "Blogs";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Post = (props: {
  frontmatter: { [key: string]: string };
  content: string;
}) => {
  const { frontmatter, content } = props;

  if (!frontmatter || !content) return null;

  return (
    <div>
      <h1>{frontmatter?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
};

const Blogs: NextPage = () => {
  const [status, setStatus] = useState("");

  const { data, error } = useSWR("/api/blogs", fetcher);
  //Handle the error state

  useEffect(() => {
    if (error) setStatus("Failed to load");
    //Handle the loading state

    if (!data) setStatus("Loading...");

    if (data) setStatus("Loaded");
    console.log(status);
  }, [data, error]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{pagetitle}</title>
        <meta name="description" content="A next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{pagetitle}</h1>

        {data?.map((element: any, index: number) => {
          return (
            <Post
              key={index}
              frontmatter={element?.frontmatter}
              content={element?.content}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Blogs;
