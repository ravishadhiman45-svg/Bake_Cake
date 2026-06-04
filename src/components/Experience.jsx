import { motion } from "framer-motion";

const experiences = [
  {
    company: "Logic Loop",
    role: "Full Stack Developer",
    period: "Sep 2024 – Present",
    description:
      "Built proprietary low-code platforms and e-commerce solutions. Extended Solid platform with automation modules for Bond Cancellation.",
  },
  {
    company: "Neosoft",
    role: "Full Stack Developer",
    period: "June 2024 – Aug 2024",
    description:
      "Developed Resume Builder using micro-frontend architecture. Integrated independent React micro-apps with Node.js backend.",
  },
  {
    company: "Monocept (Max Life Insurance)",
    role: "Senior Full Stack Developer",
    period: "Oct 2021 – May 2024",
    description:
      "Led development of Mpro insurance platform. Migrated modules to microservices and delivered critical operational features.",
  },
  {
    company: "Ikshan",
    role: "Full Stack Developer",
    period: "Sep 2020 – Aug 2021",
    description:
      "Built multiple client applications from scratch including Jibra and Green Aggregation. Designed UI and integrated full-stack authentication.",
  },
];

export default function Experience() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-20 tracking-tighter text-white text-center"
        >
          Career Timeline
        </motion.h2>

        <div className="relative border-l border-white/20 ml-4 md:ml-0 md:pl-0 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-1.25 top-2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

              <div className="text-sm text-gray-500 font-mono mb-2 uppercase tracking-widest">
                {exp.period}
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {exp.company}
              </h3>
              <h4 className="text-xl text-gray-400 mb-4">{exp.role}</h4>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
