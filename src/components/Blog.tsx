"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const blogPosts = [
  {
    title: "The Evolution of Luxury in the 21st Century",
    excerpt:
      "How changing guest expectations are redefining what luxury means in hospitality.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sustainability as a Competitive Advantage",
    excerpt:
      "Why green practices are becoming essential for top-tier hotel brands.",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop",
  },
  {
    title: "Lessons from Hospitality Leaders",
    excerpt:
      "Key takeaways from interviews with general managers of award-winning properties.",
    date: "Nov 22, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2069&auto=format&fit=crop",
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-accent-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Blog
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">
              Insights & Reflections
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl">
              Thoughts on hospitality, research, and industry trends
            </p>
          </div>
          <a
            href="#"
            className="text-accent-gold text-sm font-medium hover:underline flex items-center gap-2"
          >
            View all posts →
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <a href="#" className="block">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="text-zinc-500 text-xs">
                  {post.date} · {post.readTime}
                </span>
                <h3 className="mt-2 text-lg font-medium text-white group-hover:text-accent-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-zinc-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
