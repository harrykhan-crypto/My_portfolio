"use client";
import { useEffect, useRef } from "react";

/*
  Chibi (full-body) version of the avatar.
  pose="phone" → talking on the phone, other hand out (FAQ section)
  pose="idea"  → excited, hands together, light bulb (Collaboration card)
  Eyes and head follow the cursor. `talking` makes the mouth move.
*/
export default function MiniAvatar({ pose = "phone", talking = false }) {
  const id = (n) => `${pose}-${n}`; // unique SVG ids per avatar
  const wrap = useRef(null);
  const head = useRef(null);
  const pupils = useRef(null);
  const glare = useRef(null);
  const lids = useRef([]);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, ty = 0, x = 0, y = 0, raf, visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(wrap.current);

    const move = (e) => {
      if (!visible) return;
      const b = wrap.current.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (b.left + b.width / 2)) / (innerWidth / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (b.top + b.height * 0.3)) / (innerHeight / 2)));
    };
    addEventListener("pointermove", move, { passive: true });

    const loop = () => {
      if (visible) {
        const k = reduce ? 1 : 0.1;
        x += (tx - x) * k; y += (ty - y) * k;
        head.current?.setAttribute("transform", `rotate(${x * 6} 150 205)`);
        pupils.current?.setAttribute("transform", `translate(${x * 6} ${y * 4.5})`);
        glare.current?.setAttribute("transform", `translate(${-x * 8} 0)`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let bt;
    const blink = () => {
      lids.current.forEach((l) => l?.setAttribute("height", "24"));
      setTimeout(() => lids.current.forEach((l) => l?.setAttribute("height", "0")), 130);
      bt = setTimeout(blink, 2500 + Math.random() * 3500);
    };
    bt = setTimeout(blink, 1200 + Math.random() * 2000);

    return () => { io.disconnect(); removeEventListener("pointermove", move); cancelAnimationFrame(raf); clearTimeout(bt); };
  }, []);

  const skin = `url(#${id("sk")})`, tee = `url(#${id("tee")})`;
  const line = { stroke: "#2a1a10", strokeWidth: 4 };

  return (
    <div className={`mini mini-${pose}${talking ? " talking" : ""}`} ref={wrap}>
      <svg viewBox="0 0 300 420" aria-hidden="true">
        <defs>
          <radialGradient id={id("sk")} cx="45%" cy="38%" r="70%"><stop offset="0" stopColor="#d29a70" /><stop offset="1" stopColor="#a86d47" /></radialGradient>
          <linearGradient id={id("tee")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b48466" /><stop offset="1" stopColor="#8a5f45" /></linearGradient>
          <linearGradient id={id("lens")} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b2b38" stopOpacity=".72" /><stop offset="1" stopColor="#0a0a10" stopOpacity=".82" /></linearGradient>
          <clipPath id={id("lL")}><rect x="136" y="178" width="56" height="38" rx="9" /></clipPath>
          <clipPath id={id("lR")}><rect x="208" y="178" width="56" height="38" rx="9" /></clipPath>
        </defs>

        {/* floor shadow */}
        <ellipse cx="150" cy="404" rx="82" ry="8" fill="#000" opacity=".28" />

        {/* extras */}
        {pose === "idea" && (
          <g className="pop">
            <g className="bulb">
              <circle cx="252" cy="52" r="30" fill="#ffd43b" opacity=".18" />
              <path d="M252 30 a20 20 0 0 1 12 36 v8 h-24 v-8 a20 20 0 0 1 12 -36 z" fill="#ffd43b" {...line} strokeWidth="3.5" />
              <path d="M244 82 h16 M246 88 h12" stroke="#2a1a10" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M246 52 q6 8 12 0" fill="none" stroke="#b7791f" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g stroke="#ffd43b" strokeWidth="7" strokeLinecap="round" className="excl">
              <path d="M48 36 L60 64" /><path d="M28 60 L50 76" /><path d="M24 92 L48 94" />
            </g>
          </g>
        )}

        {/* legs */}
        <path d="M102 296 L148 296 L144 384 L108 384 Z" fill="#6b3f26" {...line} />
        <path d="M152 296 L198 296 L192 384 L156 384 Z" fill="#6b3f26" {...line} />
        <ellipse cx="124" cy="390" rx="25" ry="11" fill="#2a2a33" {...line} strokeWidth="3" />
        <ellipse cx="176" cy="390" rx="25" ry="11" fill="#2a2a33" {...line} strokeWidth="3" />

        {/* torso */}
        <path d="M104 214 Q150 204 196 214 L206 302 Q150 312 94 302 Z" fill={tee} {...line} />
        <g fill="#6e4834" opacity=".5">
          <path d="M120 240 l8 -5 l3 8z" /><path d="M160 232 l8 -5 l3 8z" /><path d="M140 270 l8 -5 l3 8z" />
          <path d="M178 262 l8 -5 l3 8z" /><path d="M112 284 l8 -5 l3 8z" /><path d="M168 290 l8 -5 l3 8z" />
        </g>
        <path d="M138 212 Q150 224 162 212" fill="none" stroke="#5e3d2b" strokeWidth="4" strokeLinecap="round" />

        {/* arms */}
        {pose === "phone" ? (
          <>
            <path d="M110 222 L86 254" stroke="#2a1a10" strokeWidth="30" strokeLinecap="round" />
            <path d="M110 222 L86 254" stroke="#a87a5c" strokeWidth="22" strokeLinecap="round" />
            <path d="M86 254 Q72 272 52 270" fill="none" stroke="#2a1a10" strokeWidth="22" strokeLinecap="round" />
            <path d="M86 254 Q72 272 52 270" fill="none" stroke="#b97e55" strokeWidth="14" strokeLinecap="round" />
            <ellipse cx="44" cy="268" rx="17" ry="9" fill={skin} {...line} strokeWidth="3" />
          </>
        ) : (
          <>
            <path d="M110 222 L96 258" stroke="#2a1a10" strokeWidth="30" strokeLinecap="round" />
            <path d="M110 222 L96 258" stroke="#a87a5c" strokeWidth="22" strokeLinecap="round" />
            <path d="M96 258 Q112 280 138 266" fill="none" stroke="#2a1a10" strokeWidth="22" strokeLinecap="round" />
            <path d="M96 258 Q112 280 138 266" fill="none" stroke="#b97e55" strokeWidth="14" strokeLinecap="round" />
            <path d="M190 222 L204 258" stroke="#2a1a10" strokeWidth="30" strokeLinecap="round" />
            <path d="M190 222 L204 258" stroke="#a87a5c" strokeWidth="22" strokeLinecap="round" />
            <path d="M204 258 Q188 280 162 266" fill="none" stroke="#2a1a10" strokeWidth="22" strokeLinecap="round" />
            <path d="M204 258 Q188 280 162 266" fill="none" stroke="#b97e55" strokeWidth="14" strokeLinecap="round" />
            <circle cx="150" cy="262" r="16" fill={skin} {...line} strokeWidth="3" />
            <path d="M142 256 v12 M150 254 v14 M158 256 v12" stroke="#6e4026" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* neck */}
        <rect x="139" y="194" width="22" height="22" fill="#a0653f" {...line} />

        {/* head (same drawing as the big avatar, scaled down) */}
        <g ref={head}>
          <g transform="translate(6 -16) scale(.72)">
            <path d="M114 190 C98 140 104 82 150 62 C178 48 216 44 248 56 C292 72 306 122 290 188 C284 152 270 128 248 120 L156 120 C136 130 122 156 114 190 Z" fill="#141419" stroke="#000" strokeWidth="3" />
            <ellipse cx="124" cy="208" rx="15" ry="23" fill={skin} {...line} />
            <ellipse cx="276" cy="208" rx="15" ry="23" fill={skin} {...line} />
            <path d="M124 176 C124 114 160 98 200 98 C240 98 276 114 276 176 C276 246 250 300 200 306 C150 300 124 246 124 176 Z" fill={skin} {...line} />
            <path d="M128 170 L128 214 L136 214 L138 172 Z M272 170 L272 214 L264 214 L262 172 Z" fill="#141419" />
            <g stroke="#141419" strokeWidth="8" strokeLinecap="round" fill="none">
              {pose === "phone"
                ? <><path d="M144 170 Q164 158 186 162" /><path d="M214 162 Q236 158 256 170" /></>
                : <><path d="M142 164 Q164 150 188 160" /><path d="M212 160 Q236 150 258 164" /></>}
            </g>
            <ellipse cx="164" cy="197" rx="14" ry="10" fill="#fff" />
            <ellipse cx="236" cy="197" rx="14" ry="10" fill="#fff" />
            <g ref={pupils}>
              <circle cx="164" cy="198" r="7" fill="#2a180c" /><circle cx="166.5" cy="195" r="2.2" fill="#fff" />
              <circle cx="236" cy="198" r="7" fill="#2a180c" /><circle cx="238.5" cy="195" r="2.2" fill="#fff" />
            </g>
            <rect ref={(el) => (lids.current[0] = el)} x="148" y="185" width="32" height="0" fill="#bd8259" />
            <rect ref={(el) => (lids.current[1] = el)} x="220" y="185" width="32" height="0" fill="#bd8259" />
            <rect x="136" y="178" width="56" height="38" rx="9" fill={`url(#${id("lens")})`} />
            <rect x="208" y="178" width="56" height="38" rx="9" fill={`url(#${id("lens")})`} />
            <g ref={glare} stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".35">
              <path clipPath={`url(#${id("lL")})`} d="M150 214 L172 178" />
              <path clipPath={`url(#${id("lR")})`} d="M222 214 L244 178" />
            </g>
            <g fill="none" stroke="#08080c" strokeWidth="7" strokeLinejoin="round">
              <rect x="136" y="178" width="56" height="38" rx="9" /><rect x="208" y="178" width="56" height="38" rx="9" />
              <path d="M192 192 Q200 186 208 192" /><path d="M136 188 L124 192 M264 188 L276 192" />
            </g>
            <path d="M200 214 Q196 234 191 241 Q200 247 209 241" fill="none" stroke="#6e4026" strokeWidth="4" strokeLinecap="round" />
            <path d="M176 254 Q189 245 200 251 Q211 245 224 254 Q211 257 200 255 Q189 257 176 254 Z" fill="#141419" />
            {pose === "phone"
              ? <ellipse className="mouth" cx="200" cy="274" rx="8" ry="10" fill="#4e2614" />
              : <><path d="M178 264 Q200 300 222 264 Z" fill="#4e2614" /><path d="M190 280 Q200 292 210 280 Q200 284 190 280 Z" fill="#e07a7a" /></>}
            <path d="M186 292 Q200 312 214 292 Q207 300 200 301 Q193 300 186 292 Z" fill="#141419" />
            <path d="M140 250 C152 292 248 292 260 250 C246 288 154 288 140 250 Z" fill="#3b2418" opacity=".22" />
            <path d="M126 170 C118 116 150 74 206 70 C262 68 296 100 286 158 C280 140 270 128 258 122 C262 134 258 144 250 150 C244 132 230 122 214 120 C214 134 204 142 190 146 C192 136 188 128 180 126 C168 138 150 140 140 138 C134 148 128 158 126 170 Z" fill="#141419" stroke="#000" strokeWidth="3" />
            <path d="M150 100 Q196 78 250 90 M144 118 Q188 98 236 104 M200 84 Q240 86 272 112" fill="none" stroke="#3c3c4a" strokeWidth="4" strokeLinecap="round" opacity=".8" />
          </g>
        </g>

        {/* phone + hand at the ear (drawn over the head) */}
        {pose === "phone" && (
          <>
            <path d="M190 222 L214 254" stroke="#2a1a10" strokeWidth="30" strokeLinecap="round" />
            <path d="M190 222 L214 254" stroke="#a87a5c" strokeWidth="22" strokeLinecap="round" />
            <path d="M214 254 Q232 206 214 168" fill="none" stroke="#2a1a10" strokeWidth="22" strokeLinecap="round" />
            <path d="M214 254 Q232 206 214 168" fill="none" stroke="#b97e55" strokeWidth="14" strokeLinecap="round" />
            <rect x="200" y="112" width="18" height="44" rx="5" fill="#3b4254" stroke="#11131a" strokeWidth="3" transform="rotate(-18 209 134)" />
            <circle cx="214" cy="160" r="14" fill={skin} {...line} strokeWidth="3" />
          </>
        )}
      </svg>
    </div>
  );
}
