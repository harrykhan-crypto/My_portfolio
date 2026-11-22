import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function Experience() {
  return (
    <Reveal className="band" id="experience">
      <h2>Experience</h2>
      <div className="tl">
        {site.experience.map((e) => (
          <div className="it" key={e.title}>
            <div className="when">{e.when}</div>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
