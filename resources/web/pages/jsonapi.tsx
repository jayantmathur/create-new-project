import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const pagetitle = "JSON API";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Jsonapi: NextPage = () => {
  const [status, setStatus] = useState("");

  const { data, error } = useSWR("/api/hello", fetcher);
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

        {status === "Loaded" ? (
          <div>
            {data.items.map((element: any, index: number) => {
              return (
                <div key={index}>
                  <h3>{element.title}</h3>
                  <span>{element.organization}</span>
                  <ul>
                    {element.facts.map((fact: string, ulindex: number) => {
                      return <li key={ulindex}>{fact}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1>{status}</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jsonapi;
