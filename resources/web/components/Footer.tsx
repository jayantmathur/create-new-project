import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import {
  RiContactsFill,
  RiHome2Fill,
  RiMenu4Fill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

import { FaLayerGroup } from "react-icons/fa";

import { SiThreedotjs } from "react-icons/si";

import { useSpring, animated, config } from "react-spring";

import styles from "../styles/Home.module.css";

const actions = [
  { icon: <RiHome2Fill />, name: "Home", link: "/" },
  {
    icon: <FaLayerGroup />,
    name: "Projects",
    link: "/projects",
  },
  { icon: <RiContactsFill />, name: "About", link: "/jsonapi" },
  { icon: <SiThreedotjs />, name: "R3", link: "/r3" },
  {
    icon: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ transform: "translateY(10%)" }}
      >
        <RiLinkedinBoxFill />
      </a>
    ),
    name: "LinkedIn",
    link: "https://linkedin.com/in/jayantmathur",
  },
];

type Heading = {
  text: string;
  style?: any;
};

const Heading = ({ text, style }: Heading) => (
  <span
    style={{
      position: "absolute",
      bottom: 30,
      fontSize: "24px",
      ...style,
    }}
  >
    {text}
  </span>
);

type Footer = {
  hidden?: boolean;
};

const Footer = (props: Footer) => {
  const { hidden = false } = props;
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");
  const [opened, setOpenedState] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anim, api] = useSpring(() => ({
    from: { y: 0 },
  }));

  useEffect(() => {
    if (opened) {
      api.start({
        from: { y: -10 },
        to: { y: 0 },
        config: config.stiff,
        onRest: () => api.stop(),
      });
    }
    if (!opened)
      api.start({
        to: { y: -10 },
        config: { mass: 1, tension: 20, friction: 1 },
        loop: { reverse: true },
      });
  }, [api, opened]);

  return (
    <>
      <Backdrop
        open={open}
        sx={{
          bgcolor: "var(--r-background-color)",
        }}
      />
      <footer className={styles.footer}>
        <Heading text="Jayant" style={{ transform: "translateX(-105%)" }} />
        <animated.div style={anim}>
          <SpeedDial
            ariaLabel="Menu"
            onClose={handleClose}
            onOpen={() => {
              setOpenedState(true);
              handleOpen();
            }}
            onPointerLeave={() => {
              if (!opened) setOpenedState(true);
            }}
            open={open}
            hidden={hidden}
            sx={{
              margin: "-75px 0px -10px 0px",
              "#Menu-actions": {
                maxWidth: "60vw",
                justifyContent: "center",
                flexFlow: "row wrap",
              },
              button: {
                bgcolor: "transparent",
                outline: open ? "none" : "2px solid var(--r-main-color)",
                ":hover": {
                  bgcolor: "transparent",
                },
              },
            }}
            icon={
              open ? (
                <RiMenu4Fill
                  style={{ width: "45%", height: "45%", pointerEvents: "none" }}
                />
              ) : (
                <Image
                  alt="logo"
                  width={"25%"}
                  height={"25%"}
                  objectFit="contain"
                  src={"/logo.svg"}
                  style={{ pointerEvents: "none" }}
                />
              )
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={
                  <Link href={action.link}>
                    <div
                      style={{
                        transform: "scale(1.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {action.icon}
                    </div>
                  </Link>
                }
                tooltipTitle={""}
                // tooltipOpen
                // tooltipPlacement={"top"}
                onClick={handleClose}
                onPointerEnter={() => setOption(action.name)}
                onPointerLeave={() => setOption("")}
                sx={{
                  color: "var(--r-main-color)",
                  bgcolor: "transparent",
                  outline: "none",
                  ":hover": {
                    outline: "2px solid var(--r-main-color)",
                  },
                  span: {
                    color: "var(--r-main-color)",
                  },

                  margin: "1rem",
                }}
              />
            ))}
          </SpeedDial>
        </animated.div>
        <Heading text="Mathur" style={{ transform: "translateX(100%)" }} />
        <Heading
          text={option}
          style={{
            position: "absolute",
            top: -100,
            left: "49.5%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            visibility: open ? "visible" : "hidden",
          }}
        />
      </footer>
    </>
  );
};

export default Footer;
