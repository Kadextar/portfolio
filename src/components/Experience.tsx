"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Research Assistant",
    organization: "Hospitality Research Center",
    period: "2023 – Present",
    description:
      "Supporting faculty research on guest experience metrics and sustainable operations. Conducting literature reviews and data analysis.",
  },
  {
    role: "Intern — Guest Relations",
    organization: "Luxury Hotel Group",
    period: "2022 – 2023",
    description:
      "Handled VIP guest requests, coordinated with housekeeping and F&B. Contributed to service recovery protocols.",
  },
  {
    role: "Hospitality Trainee",
    organization: "Boutique Resort",
    period: "2021 – 2022",
    description:
      "Rotated through front office, concierge, and events. Gained hands-on experience in high-touch service delivery.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Hospitality Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Industry & Academic Journey
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            From hands-on operations to research-driven insights
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-8 flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <span className="text-accent-gold font-medium text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-accent-gold text-sm font-medium">
                  {exp.period}
                </span>
                <h3 className="text-xl font-medium text-white mt-1">
                  {exp.role}
                </h3>
                <p className="text-zinc-500 text-sm">{exp.organization}</p>
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
