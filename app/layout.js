import "./globals.css";
import { site } from "@/data/site";

export const metadata = {
  title: `${site.name} — Software Engineer & UI/UX Designer`,
  description: `Portfolio of ${site.name}, a software engineer and UI/UX designer from ${site.location}.`,
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#151b28" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
