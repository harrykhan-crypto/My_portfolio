"use client";
import { useRef } from "react";
import Avatar from "./Avatar";
import Typed from "./Typed";
import { site } from "@/data/site";

export default function Hero() {
  const bigRef = useRef(null);
  return (
    <header className="hero" id="top">
      <div className="bigname" ref={bigRef} aria-hidden="true">{site.bigName}</div>
      <Avatar bigRef={bigRef} />
      <div className="tag">
        <b>Hi, I&apos;m {site.firstName} 👋</b>
        <span>I&apos;m a <Typed words={site.roles} /><br />based in {site.location}.</span>
      </div>
      <div className="hint"><span className="mouse">Move your cursor · click me</span><span className="touch">Tap the avatar 👋</span></div>
    </header>
  );
}
