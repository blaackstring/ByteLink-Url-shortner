
import { Geist, Geist_Mono } from "next/font/google";
import Input from "@/components/Input";
import BlurText from "@/components/BlurText";
import CircularText from "@/components/CircularText";
import GlassIcons from "@/components/GlassIcon";
import {  Github, Globe, Linkedin } from "lucide-react";

import IsClient from "./IsClient";
import { useState } from "react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // update with your own icons and colors
const items = [
  { icon: <Linkedin size={20} />, color: 'blue', label: 'LinkedIn',url:'www.linkedin.com/in/mohd-shahan-siddiqui-669a16253' },
  { icon: <Github size={20} />, color: 'black', label: 'GitHub' , url:'github.com/blaackstring/' },
  { icon: <Globe size={20} />, color: 'indigo', label: 'Portfolio' ,url:'shahandevfolio.vercel.app/' },

];

const [isPortal,setIsPortal]=useState(true)

  return (
 
         <div
      className={`${geistSans.className} ${geistMono.className} bg-gradient-to-r overflow-hidden from-indigo-500-400 via-white/20 to-black/40 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-10 pb-20 gap-13 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
   <IsClient>
    <nav className="w-full mt-16 flex jus">
  <div className="flex flex-col items-center sm:items-center lg:items-start  ">
    <BlurText
      text="ByteLink"
      delay={1550}
      animateBy="words"
      direction="top"
      className="text-5xl  md:text-6xl lg:text-8xl font-bold text-amber-300"
    />
    <hr />
    <BlurText
      delay={400}
      text="The URL SHORTENER"
      animateBy="words"
      direction="top"
      className="text-xl sm:text-xl mb-8 ml-3 lg:text-3xl"
    />
  </div>
</nav>

       <Input isPortal={isPortal} setIsPortal={setIsPortal}/>
   

<div className="w-full py-7 flex justify-end items-center">
     <div className="w-full flex justify-between items-center flex-row">

  <div style={{ height: '100px', position: 'relative' }}>
   
  <GlassIcons items={items} className="custom-class"/>
  <span>Made By Shahan</span>
</div>
<CircularText
  text="URL*SHORTENER*BLAACKSTRING*"
  onHover="speedUp"
  spinDuration={20}

/>




   </div>
   
</div>

  </IsClient>
    </div>
  
  )
    
  
}
