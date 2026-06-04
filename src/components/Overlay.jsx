import { useScroll, useTransform, motion } from "framer-motion";

const Section = ({
  text,
  subText,
  align = "center",
  start,
  end,
  scrollYProgress,
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start, end, end + 0.05],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [start - 0.05, end + 0.05],
    [50, -50],
  );

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center px-8 md:px-20 ${alignClass}`}
    >
      <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
        {text}
      </h2>
      {subText && (
        <p className="text-xl md:text-2xl text-gray-300 mt-4 font-light tracking-wide max-w-2xl">
          {subText}
        </p>
      )}
    </motion.div>
  );
};

export default function Overlay({ scrollYProgress }) {
  return (
    <>
      <Section
        text="Rajesh Chityal."
        subText="Senior Full Stack Developer"
        align="center"
        start={0.05}
        end={0.2}
        scrollYProgress={scrollYProgress}
      />
      <Section
        text="5+ Years Experience."
        subText="Specializing in React, Node.js, and Scalable Microservices."
        align="left"
        start={0.3}
        end={0.45}
        scrollYProgress={scrollYProgress}
      />
      <Section
        text="Innovating with AI."
        subText="Building AI Agents & Voice Assistance Systems."
        align="right"
        start={0.6}
        end={0.75}
        scrollYProgress={scrollYProgress}
      />
    </>
  );
}
