"use client";
import { useEffect, useState } from "react";

export default function Typed({ words }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let wi = 0, ci = 0, del = false, t;
    const tick = () => {
      const w = words[wi];
      setText(w.slice(0, ci));
      if (!del && ci < w.length) { ci++; t = setTimeout(tick, 85); }
      else if (!del) { del = true; t = setTimeout(tick, 1400); }
      else if (ci > 0) { ci--; t = setTimeout(tick, 40); }
      else { del = false; wi = (wi + 1) % words.length; t = setTimeout(tick, 300); }
    };
    tick();
    return () => clearTimeout(t);
  }, [words]);

  return <span className="typed">{text}</span>;
}
