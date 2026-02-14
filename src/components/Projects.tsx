"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Guest Satisfaction Analytics Dashboard",
    description:
      "Data visualization tool for tracking NPS, sentiment, and operational KPIs across multiple properties.",
    tags: ["Research", "Data Analysis", "UX"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sustainable Tourism Impact Study",
    description:
      "Field research on community-based tourism initiatives and their long-term socioeconomic effects.",
    tags: ["Sustainability", "Field Research", "Report"],
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop",
  },
  {
    title: "Luxury Service Standards Framework",
    description:
      "Comprehensive framework for defining and measuring excellence in high-end hospitality operations.",
    tags: ["Framework", "Standards", "Consulting"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Projects
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Selected Work
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Research initiatives and applied projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-glow overflow-hidden group hover:border-[#ff7a1a]/20 hover:shadow-glow-orange transition-all duration-500">
                <a href="#">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#ff7a1a] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-zinc-500 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full glass text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
