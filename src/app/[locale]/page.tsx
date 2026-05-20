import { Hero } from "@/components/Hero";
import { BentoProfile } from "@/components/BentoProfile";
import { BentoSchedy } from "@/components/BentoSchedy";
import { BentoKadextar } from "@/components/BentoKadextar";
import { BentoSkills } from "@/components/BentoSkills";
import { LeadershipRecognition } from "@/components/LeadershipRecognition";
import { Research } from "@/components/Research";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      {/* Modern Dashboard Bento Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 space-y-6 pb-24 -mt-10 sm:-mt-16 md:-mt-20">
        <BentoProfile />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BentoSchedy />
          <BentoKadextar />
        </div>
        <BentoSkills />
      </section>

      <Research />
      <LeadershipRecognition />
      <Projects />
      <Experience />
    </>
  );
}
