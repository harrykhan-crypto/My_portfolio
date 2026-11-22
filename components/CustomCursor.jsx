"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    let mx = -100, my = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    };
    const over = (e) => ring.current.classList.toggle("big", !!e.target.closest("a,button,.avatar,input,textarea,.card"));
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      const r = ring.current;
      r.style.transform = `translate(${rx - r.offsetWidth / 2}px,${ry - r.offsetHeight / 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    loop();
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="cur" ref={dot} aria-hidden="true" />
      <div className="ring" ref={ring} aria-hidden="true" />
    </>
  );
}
