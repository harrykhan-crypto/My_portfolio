import Reveal from "./Reveal";
import MiniAvatar from "./MiniAvatar";
import { site } from "@/data/site";

function StackRow({ items, reverse, speed }) {
  const loop = [...items, ...items]; // doubled for a seamless loop
  return (
    <div className="stack-row">
      <div className={`stack-track${reverse ? " rev" : ""}`} style={{ animationDuration: `${speed}s` }}>
        {loop.map((t, i) => (
          <span className="pill" key={i} aria-hidden={i >= items.length || undefined}>
            <span className="ico"><img src={`/icons/${t.icon}.svg`} alt="" width="20" height="20" loading="lazy" /></span>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Collab() {
  return (
    <Reveal className="band duo" id="collab">
      <div className="box collab">
        <div className="collab-text">
          <small>Collaboration</small>
          <h3>{site.collaboration}</h3>
          <a className="ghost" href={site.callLink} target="_blank" rel="noopener noreferrer">
            Book a Call <span aria-hidden="true">→</span>
          </a>
        </div>
        <MiniAvatar pose="idea" />
      </div>

      <div className="box stack">
        <h3>My Tech Stack</h3>
        <div className="stack-rows">
          {site.techStack.map((row, i) => (
            <StackRow key={i} items={row} reverse={i % 2 === 1} speed={26 + i * 6} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
