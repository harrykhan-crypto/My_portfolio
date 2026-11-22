"use client";
import { useEffect, useRef, useState } from "react";

// Wraps a section; it slides in when scrolled into view.
export default function Reveal({ as: Tag = "section", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${inView ? "in" : ""} ${className}`} {...rest}>
      {typeof children === "function" ? children(inView) : children}
    </Tag>
  );
}
