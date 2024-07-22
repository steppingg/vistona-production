import Image from "next/image";

import "./styles.scss";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

const MonthlyBudgeting = () => {
  const degrees = 360 / 6;
  let currentRotation = 0;
  let allowScroll = true;
  let animating;
  let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause();

  useGSAP(() => {
    let dotsTranslateYValue;
    let datesTranslateYValue;
    if (window) {
      dotsTranslateYValue =
        window.innerWidth <= 767
          ? "-150px"
          : window.innerWidth < 1400
          ? "-270px"
          : "-299px";
      datesTranslateYValue =
        window.innerWidth <= 767
          ? "-125px"
          : window.innerWidth < 1400
          ? "-256px"
          : "-256px";
    }

    // dotsListItems.forEach((dotsItem) => {
    //   const angle = parseInt(dotsItem.getAttribute("data-angle"));
    //   dotsItem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${dotsTranslateYValue})`;
    // });

    gsap.set(".dot1", {
      transform: `translate(-50%, -50%) rotate(90deg) translateY(${dotsTranslateYValue})`,
    });
    gsap.set(".dot2", {
      transform: `translate(-50%, -50%) rotate(150deg) translateY(${dotsTranslateYValue})`,
    });
    gsap.set(".dot3", {
      transform: `translate(-50%, -50%) rotate(210deg) translateY(${dotsTranslateYValue})`,
    });
    gsap.set(".dot4", {
      transform: `translate(-50%, -50%) rotate(270deg) translateY(${dotsTranslateYValue})`,
    });
    gsap.set(".dot5", {
      transform: `translate(-50%, -50%) rotate(330deg) translateY(${dotsTranslateYValue})`,
    });
    gsap.set(".dot6", {
      transform: `translate(-50%, -50%) rotate(30deg) translateY(${dotsTranslateYValue})`,
    });

    //   const angle = parseInt(item.getAttribute("data-angle"));
    //   item.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${datesTranslateYValue})`;
    //   dateListItemsSpan.style.transform = `rotate(${-angle}deg)`;
    // });
    gsap.set(".date-list1", {
      transform: `translate(-50%, -50%) rotate(90deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text1", {
      transform: "rotate(-90deg)",
    });

    gsap.set(".date-list2", {
      transform: `translate(-50%, -50%) rotate(150deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text2", {
      transform: "rotate(-150deg)",
    });

    gsap.set(".date-list3", {
      transform: `translate(-50%, -50%) rotate(210deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text3", {
      transform: "rotate(-210deg)",
    });

    gsap.set(".date-list4", {
      transform: `translate(-50%, -50%) rotate(270deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text4", {
      transform: "rotate(-270deg)",
    });

    gsap.set(".date-list5", {
      transform: `translate(-50%, -50%) rotate(330deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text5", {
      transform: "rotate(-330deg)",
    });

    gsap.set(".date-list6", {
      transform: `translate(-50%, -50%) rotate(30deg) translateY(${datesTranslateYValue})`,
    });
    gsap.set("#text6", {
      transform: "rotate(-30deg)",
    });

    let intentObserver = ScrollTrigger.observe({
      // target: window,
      type: "wheel,touch,pointer",
      allowClicks: true,
      wheelSpeed: -1,
      onUp: () => !animating && rotateCircle(currentRotation - degrees, -1),
      onDown: () => !animating && rotateCircle(currentRotation + degrees, 1),
      tolerance: 10,
      preventDefault: true,
      onEnable(self) {
        allowScroll = false;
        scrollTimeout.restart(true);
        // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
        let savedScroll = self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
        document.addEventListener("scroll", self._restoreScroll, {
          passive: false,
        });
      },
      onDisable: (self) =>
        document.removeEventListener("scroll", self._restoreScroll),
    });
    intentObserver.disable();

    const tl = gsap.timeline({
      defaults: {
        ease: "none",
        onUpdate: updateActiveDate,
      },
    });

    function rotateCircle(rotate, direction) {
      console.log("rotate value:", rotate);
      if (rotate <= -360 || rotate > 0 || animating) {
        intentObserver.disable(); // resume native scroll
        return;
      }

      allowScroll = false;
      scrollTimeout.restart(true);

      animating = true;
      const rotationStep = 360 / 6;
      const step = direction === -1 ? -rotationStep : rotationStep; // Determine whether to add or subtract rotationStep based on direction
      console.log(currentRotation);

      tl.to(".circle", {
        rotation: currentRotation + step,
        onComplete: () => {
          animating = false;
        },
      });

      tl.to(
        ".date-list .date, .date-list .text",
        {
          rotation: -currentRotation - step,
          onComplete: () => {
            animating = false;
            console.log("Animation completed");
          },
        },
        "<"
      );
      currentRotation += step;
    }

    ScrollTrigger.create({
      trigger: ".date-timeline-section",
      pin: true,
      start: "top top",
      end: "+=160",
      // markers: true,
      onEnter: (self) => {
        if (intentObserver.isEnabled) {
          return;
        } // in case the native scroll jumped past the end and then we force it back to where it should be.
        self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
        intentObserver.enable(); // STOP native scrolling
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled) {
          return;
        } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
        self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
        intentObserver.enable(); // STOP native scrolling
      },
    });

    // Function to update the active on dates and dots
    function updateActiveDate() {
      animating = true;
      // Get the center position of the circle
      // const circleRect = circle.getBoundingClientRect();
      // const circleCenterX = circleRect.left + circleRect.width / 2;
      // const circleCenterY = circleRect.top + circleRect.height / 2;

      // Define the tolerance for angle difference
      const tolerance = Math.PI / 6; // 30 degrees in radians

      // Iterate through each date-list item
      // dateListItems.forEach((date, index) => {
      //   const dateRect = date.getBoundingClientRect();
      //   const dateCenterX = dateRect.left + date.offsetWidth / 2;
      //   const dateCenterY = dateRect.top + date.offsetHeight / 2;

      //   // Calculate the angle between the center of the circle and the center of the date element
      //   const angle = Math.atan2(
      //     dateCenterY - circleCenterY,
      //     dateCenterX - circleCenterX
      //   );

      //   // Calculate the absolute difference between the angle and the desired angle
      //   const angleDifference = Math.abs(angle);

      //   // Check if the angle is within the tolerance of the desired angle
      //   if (angleDifference <= tolerance) {
      //     // Add the class to the date element
      //     date.classList.add("active");
      //     // Activate respective text
      //     const textList = document.querySelectorAll(".text-list .out-text");
      //     textList.forEach((text, textIndex) => {
      //       if (index === textIndex) {
      //         text.classList.add("active");
      //       } else {
      //         text.classList.remove("active");
      //       }
      //     });

      //     // dotsListItems.forEach((dot, dotIndex) => {
      //     //   if (index === dotIndex) {
      //     //     dot.classList.add("active");
      //     //   } else {
      //     //     dot.classList.remove("active");
      //     //   }
      //     // });
      //   } else {
      //     // Remove the class from the date element
      //     date.classList.remove("active");
      //   }
      // });
    }
  }, []);

  return (
    <section className="date-timeline-section">
      <div className="rows">
        <div className="circle">
          <div className="dots-list-row">
            <span className="dots dot1 active" data-angle="90"></span>
            <span className="dots dot2" data-angle="150"></span>
            <span className="dots dot3" data-angle="210"></span>
            <span className="dots dot4" data-angle="270"></span>
            <span className="dots dot5" data-angle="330"></span>
            <span className="dots dot6" data-angle="30"></span>
          </div>
          <div className="date-list-row">
            <span className="date-list date-list1 active" data-angle="90">
              <span id="text1" className="inner-text">
                <span className="date">
                  <span className="date-text">01</span>
                </span>
                <span className="text">Link Moved to a new facility1</span>
              </span>
            </span>
            <span className="date-list date-list2" data-angle="150">
              <span id="text2" className="inner-text">
                <span className="date">
                  <span className="date-text">02</span>
                </span>
                <span className="text">Link Moved to a new facility2</span>
              </span>
            </span>
            <span className="date-list date-list3" data-angle="210">
              <span id="text3" className="inner-text">
                <span className="date">
                  <span className="date-text">03</span>
                </span>
                <span className="text">Link Moved to a new facility3</span>
              </span>
            </span>
            <span className="date-list date-list4" data-angle="270">
              <span id="text4" className="inner-text">
                <span className="date">
                  <span className="date-text">04</span>
                </span>
                <span className="text">Link Moved to a new facility4</span>
              </span>
            </span>
            <span className="date-list date-list5" data-angle="330">
              <span id="text5" className="inner-text">
                <span className="date">
                  <span className="date-text">05</span>
                </span>
                <span className="text">Link Moved to a new facility5</span>
              </span>
            </span>
            <span className="date-list date-list6" data-angle="30">
              <span id="text6" className="inner-text">
                <span className="date">
                  <span className="date-text">06</span>
                </span>
                <span className="text">Link Moved to a new facility6</span>
              </span>
            </span>
          </div>
        </div>
        <div className="text-list">
          <div className="out-text active">
            LINK Moved to a<br /> new facility 2016
          </div>
          <div className="out-text">
            Move to <br /> year 2018
          </div>
          <div className="out-text">Establish the Empire on 2020</div>
          <div className="out-text">Falls of srpings 2022</div>
          <div className="out-text">
            Loved the weather of <br /> fluctiation
          </div>
          <div className="out-text">
            Road to a<br /> League 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyBudgeting;
