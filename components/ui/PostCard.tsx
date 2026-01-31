"use client";

import type { PostType } from "@/types/App";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  img?: string;
  href: string;
  title: string;
  description: string;
};

function PostCard({ img, href, title, description }: PostCardProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <Link href={href} className="bg-gray-300 dark:bg-gray-900 rounded flex flex-col items-center gap-y-4 p-4 w-45 h-full group">
        {img && (
          <Image
            src={img}
            alt="App logo"
            width={100}
            height={100}
            className=" group-hover:scale-105 transition-transform! duration-300"
          />
        )}
        <h3 className="text-black dark:text-white font-bold text-center text-xl">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-center">{description}</p>
      </Link>
    </motion.div>
  );
}

export default PostCard;
