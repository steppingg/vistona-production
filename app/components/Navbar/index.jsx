import { CursorContext, smoother } from "@/app/layout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

const links = [
  { href: "/about", text: "About Us" },
  { href: "/subscription", text: "Monthly Subscription" },
  { href: "/contact", text: "Contact Us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleActiveCursor,
    handleChangeCursorText,
    handleResetCursor,
    setCursorActiveSize,
  } = useContext(CursorContext);

  const container = useRef();
  const tl = useRef();
  const navbar = useRef();

  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(".links", {
          width: "800px",
          ease: "power3",
          duration: 1,
        })
        .to(
          ".link",
          {
            autoAlpha: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.3,
          },
          "-=0.5"
        )
        .to(
          ".backdrop",
          {
            autoAlpha: 1,
            opacity: 1,
          },
          "<"
        );
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      document?.body?.classList.add("overflow-hidden");
    } else {
      tl.current.reverse();
      document?.body?.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className="navbar transition-all duration-300 fixed top-0 left-0 w-full h-40 z-40 px-6 md:px-12"
      ref={navbar}
    >
      <div
        className="max-w-[1720px] relative mx-auto py-10 flex justify-center items-center text-white border-0 md:border-b-[1px] border-white"
        ref={container}
      >
        <button
          onClick={handleToggleMenu}
          onMouseEnter={() => {
            handleActiveCursor();
            setCursorActiveSize(50);
            handleChangeCursorText("");
          }}
          onMouseLeave={handleResetCursor}
          className="absolute right-0 md:left-0 md:right-[inherit] flex gap-3 items-center z-50"
        >
          {isOpen ? (
            <>
              <Image
                src="/static/images/close_icon.svg"
                width={18}
                height={12}
                alt="Close menu button"
              />
              <span className="hidden md:block">Close</span>
            </>
          ) : (
            <>
              <Image
                src="/static/images/burger_icon.svg"
                width={18}
                height={12}
                alt="Open menu button"
              />
              <span className="hidden md:block">Menu</span>
            </>
          )}
        </button>

        <Image
          className="w-56 md:w-80"
          src="/static/images/logo.svg"
          width={330}
          height={56}
          alt="Vistona logotype"
          priority
        />

        <div className="fixed top-0 left-0 h-screen w-0 max-w-full md:max-w-[800px] links bg-[#54545433] backdrop-blur-[50px] z-40">
          <div className="h-full flex justify-center items-end flex-col gap-8 p-10">
            {links.map(({ href, text }) => (
              <Link
                className="link px-4 py-2 invisible opacity-0 -translate-x-12 text-3xl"
                onMouseEnter={() => {
                  handleActiveCursor();
                  setCursorActiveSize(50);
                  handleChangeCursorText("");
                }}
                onMouseLeave={handleResetCursor}
                href={href}
                key={href}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>

        <div
          onClick={handleToggleMenu}
          className="backdrop fixed top-0 left-0 right-0 bottom-0 invisible opacity-0 bg-black/20 z-30"
        />
      </div>
    </nav>
  );
};

export default Navbar;
