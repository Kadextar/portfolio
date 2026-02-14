"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const publications = [
  {
    title: "Sustainable Practices in Luxury Hospitality: A Comparative Analysis",
    journal: "International Journal of Hospitality Management",
    year: "2024",
    type: "Research Paper",
    abstract:
      "Examining the integration of sustainability initiatives within luxury hotel operations and their impact on guest satisfaction.",
  },
  {
    title: "The Future of Guest Experience in Post-Digital Era",
    journal: "Hospitality & Tourism Research",
    year: "2024",
    type: "Conference Paper",
    abstract:
      "Exploring how technology and human touch combine to create memorable experiences in modern hospitality.",
  },
  {
    title: "Revenue Management Strategies in Boutique Hotels",
    journal: "Journal of Revenue and Pricing Management",
    year: "2023",
    type: "Case Study",
    abstract:
      "Analyzing dynamic pricing and inventory optimization in independent luxury properties.",
  },
];

export function Research() {
  return (
    <section id="research" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Research & Publications
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Scholarly Contributions
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Evidence-based research advancing hospitality theory and practice
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass-glow hover:border-[#ff7a1a]/20 hover:shadow-glow-orange transition-all duration-500 group">
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[#ff7a1a] text-xs font-medium tracking-wider uppercase">
                        {pub.type} · {pub.year}
                      </span>
                      <h3 className="mt-2 text-xl font-medium text-white group-hover:text-[#ff7a1a] transition-colors duration-300">
                        {pub.title}
                      </h3>
                      <p className="mt-1 text-zinc-500 text-sm">{pub.journal}</p>
                      <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                        {pub.abstract}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#">Read more →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
