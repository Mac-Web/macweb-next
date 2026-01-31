"use client";

import type { GroupedType } from "@/types/App";
import SidebarGroup from "./SidebarGroup";

const apps: Record<string, string> = { macvg: "MacVG", maclearn: "MacLearn", macweb: "MacWeb" };

type SideBarProps = {
  posts: GroupedType;
  slug: string;
  app: string;
  category: string;
  isPost?: boolean;
};

function Sidebar({ posts, slug, app, category, isPost }: SideBarProps) {
  return (
    <div className="hidden sm:block w-40 md:w-60 max-h-[calc(100vh-68px)] sticky top-17 py-5 pr-3 overflow-auto">
      <h2 className="text-xl px-4 font-bold mb-5">
        {isPost ? "All Posts" : apps[app] + " " + category[0].toUpperCase() + category.slice(1)}
      </h2>
      {Object.values(posts)
        .reverse()
        .map((matchingPosts, i) => (
          <SidebarGroup key={i} matchingPosts={matchingPosts} slug={slug} href={isPost ? "/posts" : `/apps/${app}/${category}`} />
        ))}
    </div>
  );
}

export default Sidebar;
