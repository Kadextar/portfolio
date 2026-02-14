import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { StrategicVision } from "@/components/StrategicVision";
import { LeadershipRecognition } from "@/components/LeadershipRecognition";
import { Research } from "@/components/Research";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { DigitalInnovation } from "@/components/DigitalInnovation";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { StatsBar } from "@/components/StatsBar";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <StrategicVision />
      <LeadershipRecognition />
      <Research />
      <Experience />
      <Projects />
      <DigitalInnovation />
      <Skills />
      <Blog />
      <Contact />
    </>
  );
}
