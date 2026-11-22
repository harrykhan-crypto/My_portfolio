"use client";
import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function Skills() {
  return (
    <Reveal className="band" id="skills">
      {(inView) => (
        <>
          <h2>Skills</h2>
          <div className="skills">
            {site.skills.map((s) => (
              <div className="skill" key={s.name}>
                <div className="top">{s.name}<span>{s.level}%</span></div>
                <div className="bar"><i style={{ width: inView ? `${s.level}%` : 0 }} /></div>
              </div>
            ))}
          </div>
        </>
      )}
    </Reveal>
  );
}
