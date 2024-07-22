"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import useWindowSize from "./hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const size = useWindowSize();

  const app = useRef();
  const scrollContainer = useRef();

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  useEffect(() => {
    setBodyHeight();
  }, [size.height]);

  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  };

  const skewScrolling = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    const difference = data.current - data.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 20;

    scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;

    requestAnimationFrame(() => skewScrolling());
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div ref={app} className="App">
          <div ref={scrollContainer} className="scroll">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
