"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type CardProps = {
  name: string;
  src: string;
};

function Card({ name, src }: CardProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.7, type: "spring" }}
      href={`https://mac-web.github.io/${name.toLowerCase()}/`}
      className="bg-gray-300 dark:bg-gray-900 rounded flex flex-col items-center gap-y-5 py-5 px-7 group"
    >
      <Image
        src={src}
        alt={name + " Logo"}
        className="group-hover:scale-105 transition-transform duration-300"
        width={100}
        height={100}
      />
      <h2 className="text-black dark:text-white text-lg font-bold">{name}</h2>
    </motion.a>
  );
}

export default Card;
