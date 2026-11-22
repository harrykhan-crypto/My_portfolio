"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";

// Deterministic random so server and browser draw the same shirt pattern
function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export default function Avatar({ bigRef }) {
  const wrap = useRef(null);
  const r = useRef({}); // svg parts
  const [bubble, setBubble] = useState({ on: false, text: "" });
  const smile = useRef(0);
  const greet = useRef(0);
  const timer = useRef(0);

  const pattern = useMemo(() => {
    const rnd = seeded(7);
    return Array.from({ length: 70 }, () => {
      const x = 50 + rnd() * 300, y = 340 + rnd() * 100, s = 4 + rnd() * 7, a = rnd() * 360;
      return { d: `M${x.toFixed(1)} ${y.toFixed(1)} l${s.toFixed(1)} ${(-s * 0.6).toFixed(1)} l${(s * 0.4).toFixed(1)} ${s.toFixed(1)} z`, t: `rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})` };
    });
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = r.current;
    let tx = 0, ty = 0, x = 0, y = 0, sm = 0, last = 0, raf;

    const onMove = (e) => {
      const b = wrap.current.getBoundingClientRect();
      const cx = b.left + b.width / 2, cy = b.top + b.height * 0.42;
      tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight / 2)));
      last = performance.now();
    };
    addEventListener("pointermove", onMove, { passive: true });

    const T = (el, v) => el && el.setAttribute("transform", v);
    const frame = (t) => {
      if (t - last > 3500) { tx = Math.sin(t / 1700) * 0.35; ty = Math.cos(t / 2300) * 0.2; }
      const k = reduce ? 1 : 0.09;
      x += (tx - x) * k; y += (ty - y) * k; sm += (smile.current - sm) * 0.15;

      T(p.head, `translate(${x * 16} ${y * 10}) rotate(${x * 7} 200 300)`);
      T(p.face, `translate(${x * 12} ${y * 9})`);
      T(p.hairFront, `translate(${x * 7} ${y * 4})`);
      T(p.hairBack, `translate(${-x * 4} ${-y * 2})`);
      T(p.body, `translate(${x * 4} 0) rotate(${x * 1.5} 200 440)`);
      T(p.pupils, `translate(${x * 6} ${y * 4.5})`);
      T(p.brows, `translate(0 ${-Math.max(0, -y) * 6 - sm * 4})`);
      T(p.glare, `translate(${-x * 8} 0)`);
      const w = 14 + sm * 6;
      p.mouth?.setAttribute("d", `M${200 - w} 270 Q${200 + x * 4} ${276 + sm * 12 + Math.max(0, -y) * 3} ${200 + w} 270`);
      if (wrap.current) wrap.current.style.transform = `translate(${x * 10}px,${y * 6}px)`;
      if (bigRef?.current) bigRef.current.style.transform = `translate(calc(-50% + ${-x * 40}px),calc(-56% + ${-y * 18}px))`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    let blinkT;
    const blink = () => {
      p.lids?.forEach((l) => l.setAttribute("height", "24"));
      setTimeout(() => p.lids?.forEach((l) => l.setAttribute("height", "0")), 130);
      blinkT = setTimeout(blink, 2200 + Math.random() * 3500);
    };
    blinkT = setTimeout(blink, 1800);

    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); clearTimeout(blinkT); clearTimeout(timer.current); };
  }, [bigRef]);

  const onClick = () => {
    const text = site.greetings[greet.current++ % site.greetings.length];
    setBubble({ on: true, text });
    smile.current = 1;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setBubble((b) => ({ ...b, on: false })); smile.current = 0; }, 1800);
  };

  const set = (k) => (el) => { r.current[k] = el; };
  const lid = (i) => (el) => { r.current.lids = r.current.lids || []; r.current.lids[i] = el; };

  return (
    <div className="avatar" ref={wrap} onClick={onClick} role="button" tabIndex={0}
      aria-label={`Cartoon avatar of ${site.firstName}. Click to say hi.`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}>
      <svg viewBox="0 0 400 440" aria-hidden="true">
        <defs>
          <radialGradient id="sk" cx="45%" cy="38%" r="70%"><stop offset="0" stopColor="#d29a70" /><stop offset="1" stopColor="#a86d47" /></radialGradient>
          <linearGradient id="tee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b48466" /><stop offset="1" stopColor="#8a5f45" /></linearGradient>
          <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b2b38" stopOpacity=".72" /><stop offset="1" stopColor="#0a0a10" stopOpacity=".82" /></linearGradient>
          <clipPath id="teeClip"><path d="M48 440 C54 372 116 336 200 334 C284 336 346 372 352 440 Z" /></clipPath>
          <clipPath id="lensL"><rect x="136" y="178" width="56" height="38" rx="9" /></clipPath>
          <clipPath id="lensR"><rect x="208" y="178" width="56" height="38" rx="9" /></clipPath>
        </defs>

        {/* body */}
        <g ref={set("body")}>
          <path d="M48 440 C54 372 116 336 200 334 C284 336 346 372 352 440 Z" fill="url(#tee)" stroke="#2a1a10" strokeWidth="4" />
          <g clipPath="url(#teeClip)" fill="#6e4834" opacity=".55">
            {pattern.map((s, i) => <path key={i} d={s.d} transform={s.t} />)}
          </g>
          <path d="M96 382 Q110 412 104 440 M304 382 Q290 412 296 440" fill="none" stroke="#5e3d2b" strokeWidth="3" opacity=".7" />
          <path d="M164 338 Q200 364 236 338" fill="none" stroke="#5e3d2b" strokeWidth="6" strokeLinecap="round" />
        </g>
        {/* neck */}
        <path d="M172 272 L170 340 Q200 354 230 340 L228 272 Z" fill="#a0653f" stroke="#2a1a10" strokeWidth="4" />

        {/* head */}
        <g ref={set("head")}>
          <g ref={set("hairBack")}>
            <path d="M114 190 C98 140 104 82 150 62 C178 48 216 44 248 56 C292 72 306 122 290 188 C284 152 270 128 248 120 L156 120 C136 130 122 156 114 190 Z" fill="#141419" stroke="#000" strokeWidth="3" />
          </g>
          <ellipse cx="124" cy="208" rx="15" ry="23" fill="url(#sk)" stroke="#2a1a10" strokeWidth="4" />
          <ellipse cx="276" cy="208" rx="15" ry="23" fill="url(#sk)" stroke="#2a1a10" strokeWidth="4" />
          <path d="M124 176 C124 114 160 98 200 98 C240 98 276 114 276 176 C276 246 250 300 200 306 C150 300 124 246 124 176 Z" fill="url(#sk)" stroke="#2a1a10" strokeWidth="4" />
          <path d="M128 170 L128 214 L136 214 L138 172 Z M272 170 L272 214 L264 214 L262 172 Z" fill="#141419" />

          <g ref={set("face")}>
            <g ref={set("brows")} stroke="#141419" strokeWidth="8" strokeLinecap="round" fill="none">
              <path d="M142 168 Q164 158 188 166" /><path d="M212 166 Q236 158 258 168" />
            </g>
            <ellipse cx="164" cy="197" rx="14" ry="10" fill="#fff" />
            <ellipse cx="236" cy="197" rx="14" ry="10" fill="#fff" />
            <g ref={set("pupils")}>
              <circle cx="164" cy="198" r="7" fill="#2a180c" /><circle cx="166.5" cy="195" r="2.2" fill="#fff" />
              <circle cx="236" cy="198" r="7" fill="#2a180c" /><circle cx="238.5" cy="195" r="2.2" fill="#fff" />
            </g>
            <rect ref={lid(0)} x="148" y="185" width="32" height="0" fill="#bd8259" />
            <rect ref={lid(1)} x="220" y="185" width="32" height="0" fill="#bd8259" />

            {/* glasses */}
            <rect x="136" y="178" width="56" height="38" rx="9" fill="url(#lens)" />
            <rect x="208" y="178" width="56" height="38" rx="9" fill="url(#lens)" />
            <g ref={set("glare")} stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".35">
              <path clipPath="url(#lensL)" d="M150 214 L172 178" />
              <path clipPath="url(#lensR)" d="M222 214 L244 178" />
            </g>
            <g fill="none" stroke="#08080c" strokeWidth="7" strokeLinejoin="round">
              <rect x="136" y="178" width="56" height="38" rx="9" /><rect x="208" y="178" width="56" height="38" rx="9" />
              <path d="M192 192 Q200 186 208 192" /><path d="M136 188 L124 192 M264 188 L276 192" />
            </g>

            <path d="M200 214 Q196 234 191 241 Q200 247 209 241" fill="none" stroke="#6e4026" strokeWidth="4" strokeLinecap="round" />
            <path d="M176 258 Q189 249 200 255 Q211 249 224 258 Q211 261 200 259 Q189 261 176 258 Z" fill="#141419" />
            <path ref={set("mouth")} d="M186 270 Q200 276 214 270" fill="none" stroke="#4e2614" strokeWidth="4" strokeLinecap="round" />
            <path d="M194 280 Q200 284 206 280 L204 286 Q200 288 196 286 Z" fill="#141419" opacity=".9" />
            <path d="M184 290 Q200 312 216 290 Q208 300 200 301 Q192 300 184 290 Z" fill="#141419" />
            <path d="M140 250 C152 292 248 292 260 250 C246 288 154 288 140 250 Z" fill="#3b2418" opacity=".22" />
          </g>

          <g ref={set("hairFront")}>
            <path d="M126 170 C118 116 150 74 206 70 C262 68 296 100 286 158 C280 140 270 128 258 122 C262 134 258 144 250 150 C244 132 230 122 214 120 C214 134 204 142 190 146 C192 136 188 128 180 126 C168 138 150 140 140 138 C134 148 128 158 126 170 Z" fill="#141419" stroke="#000" strokeWidth="3" />
            <path d="M150 100 Q196 78 250 90 M144 118 Q188 98 236 104 M200 84 Q240 86 272 112" fill="none" stroke="#3c3c4a" strokeWidth="4" strokeLinecap="round" opacity=".8" />
          </g>
        </g>
      </svg>
      <div className={`bubble${bubble.on ? " on" : ""}`} aria-live="polite">{bubble.text}</div>
    </div>
  );
}
