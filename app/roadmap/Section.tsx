"use client";

import { motion } from "framer-motion";

type SectionProps = {
  date: string;
  content: string;
};

function Section({ date, content }: SectionProps) {
  return (
    <motion.div
      initial={{ y: 150, opacity: 0.3 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="text-gray-700 dark:text-gray-300 text-lg leading-10 py-12 max-w-325 flex gap-x-12 items-center group"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex-2 bg-gray-200 dark:bg-gray-950 text-xl text-black dark:text-white text-center leading-10 rounded border-2 border-gray-700 p-4 relative after:content-[''] after:h-50 after:w-1 after:bg-gray-700 after:absolute after:left-[50%] after:-translate-x-half after:top-[calc(100%+2px)] group-last-of-type:after:from-gray-700! group-last-of-type:after:to-gray-200! dark:group-last-of-type:after:to-gray-950! group-last-of-type:after:bg-linear-to-b! group-last-of-type:after:h-20!">
        {date}
      </div>
      <p className="flex-8">{content}</p>
    </motion.div>
  );
}

export default Section;
