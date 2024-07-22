"use client";

import "./globals.css";

import Cursor from "./components/Cursor";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import Observer from "gsap-trial/Observer";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const CursorContext = createContext();

export let smoother;

export default function RootLayout({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [cursorText, setCursorText] = useState("EXPAND");
  const [cursorDefaultSize, setCursorDefaultSize] = useState(20);
  const [cursorActiveSize, setCursorActiveSize] = useState(100);
  const [cursorTextSize, setCursorTextSize] = useState(20);
  const [isTouchableDevice, setIsTouchableDevice] = useState();

  useEffect(() => {
    setIsTouchableDevice(matchMedia("(pointer: coarse)").matches);
  }, [isTouchableDevice]);

  const handleActiveCursor = () => setIsActive(true);
  const handleNonActiveCursor = () => setIsActive(false);

  const handleChangeCursorText = (text) => setCursorText(text);
  const handleResetCursorText = () => setCursorText("EXPAND");

  const handleChangeCursorSizeToDefaultValues = () => {
    setCursorActiveSize(100);
    setCursorDefaultSize(20);
  };

  const handleChangeCursorTextSizeToDefaultValues = () => setCursorTextSize(20);

  const handleResetCursor = () => {
    handleResetCursorText();
    handleNonActiveCursor();
    handleChangeCursorSizeToDefaultValues();
    handleChangeCursorTextSizeToDefaultValues();
  };

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

  useLayoutEffect(() => {
    smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <html lang="en">
      <body className={urbanist.className}>
        {!isTouchableDevice ? (
          <Cursor
            isActive={isActive}
            cursorText={cursorText}
            activeSize={cursorActiveSize}
            defaultSize={cursorDefaultSize}
            textSize={cursorTextSize}
          />
        ) : null}
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* <h1
              onMouseEnter={() => {
                setIsActive(true);
              }}
              onMouseLeave={() => {
                setIsActive(false);
              }}
              className="text-[4.5vw] max-w-[90vw] text-center text-slate-400 p-20"
            >
              The quick brown fox jumps over the lazy dog
            </h1>

            <button
              className="px-6 py-4"
              onMouseEnter={() => {
                handleChangeCursorText("CLICK");
                handleActiveCursor();
                setCursorActiveSize(40);
                setCursorTextSize(12);
              }}
              onMouseLeave={handleResetCursor}
            >
              HELLO WORLD
            </button> */}

            <CursorContext.Provider
              value={{
                isActive,
                handleActiveCursor,
                handleNonActiveCursor,

                cursorText,
                handleChangeCursorText,
                handleResetCursorText,

                handleResetCursor,

                setCursorDefaultSize,
                setCursorActiveSize,
                handleChangeCursorSizeToDefaultValues,
              }}
            >
              {children}
            </CursorContext.Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
