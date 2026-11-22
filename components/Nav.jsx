"use client";
import { useRef, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Work", hideSmall: true },
  { href: "#projects", label: "Projects" },
  { href: "#faq", label: "FAQ", hideSmall: true },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [sound, setSound] = useState(false);
  const ac = useRef(null);

  const toggle = () => {
    try {
      ac.current = ac.current || new (window.AudioContext || window.webkitAudioContext)();
      ac.current.resume();
      setSound((s) => !s);
    } catch { setSound(false); }
  };

  const blip = () => {
    const a = ac.current;
    if (!sound || !a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.frequency.value = 660 + Math.random() * 120;
    g.gain.setValueAtTime(0.06, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.12);
    o.connect(g).connect(a.destination);
    o.start(); o.stop(a.currentTime + 0.13);
  };

  return (
    <nav className="nav" aria-label="Main">
      <a className="brand" href="#top" onPointerEnter={blip}><i />{site.handle}</a>
      {links.map((l) => (
        <a key={l.href} className={`l${l.hideSmall ? " hide-s" : ""}`} href={l.href} onPointerEnter={blip}>{l.label}</a>
      ))}
      <button onClick={toggle} aria-pressed={sound} aria-label="Toggle hover sound" title="Sound">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          <path d="M17 9a4 4 0 0 1 0 6" opacity={sound ? 1 : 0.35} />
        </svg>
      </button>
    </nav>
  );
}
