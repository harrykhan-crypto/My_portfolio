import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} {site.name} · Built with Next.js and lots of chai
    </footer>
  );
}
