"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BlurryCursor({
  isActive,
  cursorText,
  activeSize,
  defaultSize,
  textSize,
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const circle = useRef();
  const size = isActive ? activeSize : defaultSize;

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  return (
    <div className="relative z-50">
      <div
        style={{
          width: size,
          height: size,
          //   filter: `blur(${isActive ? 30 : 0}px)`,
          transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
        }}
        className={`top-0 left-0 fixed flex items-center justify-center rounded-full #mix-blend-difference pointer-events-none bg-red-700 z-50`}
        ref={circle}
      >
        {isActive ? (
          <div className="text-white" style={{ fontSize: textSize }}>
            {cursorText}
          </div>
        ) : null}
      </div>
    </div>
  );
}
