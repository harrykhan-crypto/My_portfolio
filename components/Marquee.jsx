import { site } from "@/data/site";

export default function Marquee() {
  const items = [...site.marquee, ...site.marquee].flatMap((k, i) => [
    <span key={`k${i}`}>{k}</span>,
    <span key={`s${i}`}>✦</span>,
  ]);
  return (
    <div className="marq" aria-hidden="true">
      <div>{items}</div>
    </div>
  );
}
