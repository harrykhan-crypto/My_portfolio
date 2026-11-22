"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { site } from "@/data/site";

function Counter({ to, suffix, start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, start]);
  return <b>{n}{suffix}</b>;
}

export default function About() {
  return (
    <Reveal className="band" id="about">
      {(inView) => (
        <div className="about">
          <div>
            <h2>About me</h2>
            {site.about.map((t, i) => <p key={i}>{t}</p>)}
            <span className="where">📍 {site.location}</span>
          </div>
          <div className="stats">
            {site.stats.map((s) => (
              <div className="stat" key={s.label}>
                <Counter to={s.n} suffix={s.s} start={inView} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Reveal>
  );
}
