import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSpring, animated, config } from "react-spring";

const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const anim = useSpring({
    reset: true,
    loop: true,
    from: { rotateY: 0 },
    to: { rotateY: 360 },
    config: config.slow,
  });

  useEffect(() => {
    const handleStart = (url: any) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: any) =>
      url == router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "var(--r-background-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column wrap",
        opacity: loading ? 1 : 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <animated.div style={{ ...anim }}>
        <Image
          alt="loading logo"
          width={"25%"}
          height={"25%"}
          src={"/logo.svg"}
          objectFit={"contain"}
        />
      </animated.div>
    </div>
  );
};

export default Loading;
