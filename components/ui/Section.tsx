"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const phrases = [
  "Take me there",
  "Check it out",
  "Go there",
  "Let me try",
  "Try now",
  "Let me see",
  "Sounds cool",
  "Interesting",
];

type SectionProps = {
  title: string;
  description: string;
  app: string;
  color: string;
  img: string;
  odd?: boolean;
};

function Section({ title, description, app, color, img, odd }: SectionProps) {
  const [selectedPhrase, setSelectedPhrase] = useState(0);

  useEffect(() => {
    setSelectedPhrase(Math.floor(Math.random() * phrases.length));
  }, []);

  return (
    <motion.div
      className={`flex ${
        odd ? "flex-col-reverse" : "flex-col"
      } items-center gap-y-10 md:flex-row px-20 md:px-20 lg:px-[calc(50%-550px)] gap-x-20 py-14`}
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 200, opacity: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      viewport={{ once: true }}
    >
      {!odd && (
        <Image
          src={img}
          alt={app + " Logo"}
          width={200}
          height={200}
          className="drop-shadow-gray-300 transition-all hover:scale-105 w-50 h-50"
        />
      )}
      <div className="flex flex-col gap-y-7">
        <h2 className="text-black dark:text-white text-3xl font-bold">{title}</h2>
        <p className="text-gray-900 dark:text-gray-100 text-lg">{description}</p>
        <div className="flex gap-x-7">
          {app != "macweb" && (
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.7, type: "spring" }}
              href={`https://mac-web.github.io/${app}/`}
              className="section-btn action text-white!"
              style={{ borderColor: color, backgroundColor: color }}
            >
              {phrases[selectedPhrase]}
            </motion.a>
          )}
          <motion.a
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.7, type: "spring" }}
            href={`https://mac-web.github.io/macblog/#/apps/${app}/`}
            className="section-btn"
            target="_blank"
            style={{ borderColor: color }}
          >
            More info
          </motion.a>
        </div>
      </div>
      {odd && (
        <Image
          src={img}
          alt={app + " Logo"}
          width={200}
          height={200}
          className="drop-shadow-gray-300 transition-all hover:scale-105 w-50 h-50"
        />
      )}
    </motion.div>
  );
}

export default Section;
