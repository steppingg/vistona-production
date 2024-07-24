import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

const Prefooter = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      ease: "none",
    });

    tl.from(".image", {
      scale: 0.9,
      duration: 1,
      transformOrigin: "center center",
    }).to(
      {},
      {
        duration: 1,
      }
    );
    ScrollTrigger.create({
      trigger: ".image-container",
      start: "top top",
      end: "+=100%",
      pin: true,
      animation: tl,
      scrub: 0.78,
      pinSpacing: false,
    });
  });
  return (
    <>
      <section
        ref={container}
        className="image-container relative w-screen h-screen"
      >
        <Image
          className="image object-cover -z-10 w-screen h-screen"
          src="/static/images/prefooter_bg.jpg"
          width={1920}
          height={1080}
          alt="Prefooter"
        />

        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-4xl lg:text-5xl #py-56 px-6 #md:py-96 md:px-12 #xl:px-72 text-center text-white">
          Opting for a maintenance care package for natural stone on a super
          yacht is a prudent choice that yields benefits in terms of enhancing
          beauty, ensuring longevity, and preserving value.
        </h1>
      </section>
      <div className="h-screen w-screen" />
    </>
  );
};

export default Prefooter;
