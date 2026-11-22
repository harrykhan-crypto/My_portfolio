import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Collab from "@/components/Collab";
import Socials from "@/components/Socials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Skills />
        <Experience />
        <Projects />
        <Collab />
        <Socials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
