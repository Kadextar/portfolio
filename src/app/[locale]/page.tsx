import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LeadershipRecognition } from "@/components/LeadershipRecognition";
import { Research } from "@/components/Research";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Research />
      <LeadershipRecognition />
      <Projects />
      <Experience />
      <Skills />
    </>
  );
}
