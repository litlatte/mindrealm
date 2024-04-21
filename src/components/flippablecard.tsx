"use client";
import { cn } from "@/lib/utils";
import { Flashcard } from "@prisma/client";
import { motion, useSpring } from "framer-motion";
import { Pointer } from "lucide-react";
import React, { useState, useRef, useEffect, Component } from "react";

// Learn more: https://www.framer.com/docs/guides/overrides/

//Spring animation parameters
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

//height={"16rem"}
//width={"32rem"}

const height = "16rem";
const width = "32rem";

export function FlippableCard(props: {
  className?: string;
  backClassName?: string;
  frontClassName?: string;
  flashcard: Flashcard;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { flashcard } = props;

  const handleClick = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const [rotateXaxis, setRotateXaxis] = useState(0);
  const [rotateYaxis, setRotateYaxis] = useState(0);
  const ref = useRef(null);

  //   const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
  //     const element = ref.current;
  //     if (!element) return;
  //     //@ts-ignore
  //     const elementRect = element.getBoundingClientRect();
  //     const elementWidth = elementRect.width;
  //     const elementHeight = elementRect.height;
  //     const elementCenterX = elementWidth / 2;
  //     const elementCenterY = elementHeight / 2;
  //     const mouseX = event.clientY - elementRect.y - elementCenterY;
  //     const mouseY = event.clientX - elementRect.x - elementCenterX;
  //     console.log("a", mouseX, mouseY);
  //     console.log("b", mouseX / elementWidth, mouseY / elementHeight);
  //     const cap = (value: number, min: number, max: number) =>
  //       Math.min(Math.max(value, min), max);
  //     const degreeX = cap(mouseX / elementWidth, 0, 0.5) * 2; //The number is the rotation factor
  //     const degreeY = cap(mouseY / elementHeight, 0, 0.5) * 2; //The number is the rotation factor

  //     setRotateXaxis(degreeX);
  //     setRotateYaxis(degreeY);
  //   };

  //   const handleMouseEnd = () => {
  //     setRotateXaxis(0);
  //     setRotateYaxis(0);
  //   };

  //   const dx = useSpring(0, spring);
  //   const dy = useSpring(0, spring);

  //   useEffect(() => {
  //     dx.set(-rotateXaxis);
  //     dy.set(rotateYaxis);
  //   }, [rotateXaxis, rotateYaxis]);

  return (
    <motion.div
      onClick={handleClick}
      transition={spring}
      style={{
        perspective: "4000px",
        transformStyle: "preserve-3d",
        width: width,
        height: height,
      }}
    >
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.1 }} //Change the scale of zooming in when hovering
        // onMouseMove={handleMouseMove}
        // onMouseLeave={handleMouseEnd}
        transition={spring}
        style={{
          width: "100%",
          height: "100%",
          //   rotateX: dx,
          //   rotateY: dy,
        }}
      >
        <div
          style={{
            perspective: "4000px",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 0 : 1,
              backfaceVisibility: "hidden",
              position: "absolute",
            }}
          >
            <div
              className={cn(
                "bg-white select-none cursor-pointer rounded-3xl border border-black/10 p-6 flex flex-col gap-4 items-center justify-center text-xl",
                props.className,
                props.frontClassName
              )}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-accent-secondary/20 rounded-lg py-1 px-2">
                <div className="text-sm font-bold">Click for solution</div>
                <Pointer className="w-4 h-4  -rotate-45" />
              </div>
              <p className="text-xl font-bold text-uppercase">Question</p>
              <p>{flashcard.question}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 1 : 0,
              backfaceVisibility: "hidden",
              position: "absolute",
            }}
          >
            <div
              className={cn(
                " rounded-3xl border select-none cursor-pointer border-black/10 p-6 flex flex-col items-center justify-center text-xl bg-accent text-on-accent",
                props.className,
                props.frontClassName
              )}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <p className="text-xl font-bold text-uppercase">Solution</p>
              <p>{flashcard.answer}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
