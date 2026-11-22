"use client";
import Reveal from "./Reveal";
import { site } from "@/data/site";

function ProjectCard({ p }) {
  const move = (e) => {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    c.style.setProperty("--x", `${e.clientX - r.left}px`);
    c.style.setProperty("--y", `${e.clientY - r.top}px`);
    c.style.transform = `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
  };
  const leave = (e) => { e.currentTarget.style.transform = ""; };
  const initials = p.title.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  const Tag = p.link ? "a" : "div";
  const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag className="card" onPointerMove={move} onPointerLeave={leave} {...linkProps}>
      <div className="thumb" style={{ background: p.color }}>{initials}</div>
      {p.status && <span className="status">{p.status}</span>}
      <h3>{p.title}</h3>
      <p>{p.text}</p>
      <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
    </Tag>
  );
}

export default function Projects() {
  return (
    <Reveal className="band" id="projects">
      <h2>Projects</h2>
      <div className="grid">
        {site.projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </Reveal>
  );
}
