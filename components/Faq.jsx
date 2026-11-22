"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import MiniAvatar from "./MiniAvatar";
import { site } from "@/data/site";

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [talking, setTalking] = useState(false);
  const t = useRef(0);

  const toggle = (i) => {
    setOpen((o) => (o === i ? -1 : i));
    // avatar "answers" on the phone for a moment
    setTalking(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setTalking(false), 1800);
  };

  return (
    <Reveal className="band" id="faq">
      <h2>FAQ</h2>
      <div className="faq">
        <MiniAvatar pose="phone" talking={talking} />
        <div className="faq-list">
          {site.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`qa${isOpen ? " open" : ""}`} key={f.q}>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => toggle(i)}>
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="ans" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
