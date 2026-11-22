"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function Contact() {
  const [note, setNote] = useState("");

  // No backend needed: opens the visitor's email app with the message filled in.
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setNote("Your email app should open with the message ready. If it doesn't, email me at " + site.email);
  };

  return (
    <Reveal className="band" id="contact">
      <h2>Let&apos;s talk</h2>
      <div className="contact">
        <div className="info">
          <p style={{ margin: 0 }}>Open to new roles and interesting projects. Send a message and I&apos;ll get back to you within 24 hours.</p>
          <div><small>Email</small><a href={`mailto:${site.email}`}>{site.email}</a></div>
          {site.phone && <div><small>Phone</small><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></div>}
          <div><small>Location</small><b>{site.location}</b></div>
        </div>
        <form onSubmit={submit}>
          <input name="name" placeholder="Your name" required autoComplete="name" />
          <input name="email" type="email" placeholder="Your email" required autoComplete="email" />
          <textarea name="message" placeholder="Your message" required />
          <button className="btn" type="submit">Send message</button>
          {note && <div className="note" role="status">{note}</div>}
        </form>
      </div>
    </Reveal>
  );
}
