"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Research & Analysis",
    skills: [
      "Qualitative & Quantitative Research",
      "Literature Review",
      "Data Analysis (SPSS, Excel)",
      "Academic Writing",
      "Survey Design",
    ],
  },
  {
    title: "Hospitality Operations",
    skills: [
      "Guest Relations",
      "Revenue Management",
      "Service Design",
      "Quality Standards",
      "Event Coordination",
    ],
  },
  {
    title: "Strategic & Soft Skills",
    skills: [
      "Strategic Planning",
      "Cross-cultural Communication",
      "Project Management",
      "Presentation",
      "Leadership",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Skills & Competencies
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Expertise & Capabilities
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            A blend of academic rigor and industry-relevant skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h3 className="text-lg font-medium text-accent-gold mb-6">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, j) => (
                  <li
                    key={j}
                    className="text-zinc-400 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/60 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
