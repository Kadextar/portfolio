import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Research } from "@/components/Research";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Research />
      <Experience />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
    </>
  );
}
