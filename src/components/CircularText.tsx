import React, { useEffect, useState } from "react";
import {
  motion,
  useAnimation,

} from "framer-motion";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
  radius?: number;
  isPortal?:boolean
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  radius = 44,
  isPortal=false
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();


   const[ Width,setWidth]=useState({
   width: typeof window !== "undefined" ? window.innerWidth : 1200,
   })


   useEffect(()=>{
    const handleWidth=()=>{
      if(window){
        setWidth({
          width:window?.innerWidth
        })
      }
    }
    

    window.addEventListener('resize',handleWidth)


    return ()=>window.removeEventListener('resize',handleWidth)
   },[])



  useEffect(() => {
    // Start continuous rotation
    controls.start({
      rotate: 360,
      transition: {
        duration: spinDuration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [spinDuration, controls]);

  const handleHoverStart = () => {
    if (!onHover) return;

    switch (onHover) {
      case "slowDown":
        controls.start({
          rotate: 360,
          scale: 1.1,
          transition: {
            rotate: {
              duration: spinDuration * 3,
              ease: "linear",
              repeat: Infinity,
            },
            scale: {
              type: "spring",
              damping: 20,
              stiffness: 300,
            },
          },
        });
        break;
      case "speedUp":
        controls.start({
          rotate: 360,
          scale: 0.9,
          transition: {
            rotate: {
              duration: spinDuration / 4,
              ease: "linear",
              repeat: Infinity,
            },
            scale: {
              type: "spring",
              damping: 20,
              stiffness: 300,
            },
          },
        });
        break;
      case "pause":
        controls.stop();
        controls.start({
          scale: 1,
          transition: {
            scale: {
              type: "spring",
              damping: 15,
              stiffness: 400,
            },
          },
        });
        break;
      case "goBonkers":
        controls.start({
          rotate: 360,
          scale: [1, 1.3, 0.7, 1.1, 0.9, 1],
          transition: {
            rotate: {
              duration: spinDuration / 15,
              ease: "linear",
              repeat: Infinity,
            },
            scale: {
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        });
        break;
    }
  };

  const handleHoverEnd = () => {
    // Return to normal rotation
    controls.start({
      rotate: 360,
      scale: 1,
      transition: {
        rotate: {
          duration: spinDuration,
          ease: "linear",
          repeat: Infinity,
        },
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
    });
  };

  const adjustedRadius = Width.width< 400 ? 30 : radius;
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{
        width: adjustedRadius*1.4,
        height: adjustedRadius*1.6,
      }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        return (
          <span
            key={i}
            className="absolute text-l font-medium select-none"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
              transformOrigin: 'center',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;