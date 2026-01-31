"use client";

import { PostType } from "@/types/App";
import { useState } from "react";
import Link from "next/link";

type SidebarGroupProps = {
  matchingPosts: PostType[];
  href: string;
  slug: string;
};

function SidebarGroup({ matchingPosts, href, slug }: SidebarGroupProps) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div>
      <h2 className="font-bold px-4 py-2 cursor-pointer my-1" onClick={() => setOpen(!open)}>
        {new Date(matchingPosts[0].date).getFullYear()}
      </h2>
      <div className="flex flex-col">
        {open &&
          matchingPosts.map((post) => (
            <Link
              key={post.id}
              href={`${href}/${post.slug}`}
              className={` rounded hover:bg-gray-300 dark:hover:bg-gray-900 px-4 py-2 transition-colors!
                    ${post.slug === slug ? "text-blue-600 dark:text-blue-500" : "text-gray-700 dark:text-gray-300"}`}
            >
              {post.sidetitle || post.title}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SidebarGroup;
