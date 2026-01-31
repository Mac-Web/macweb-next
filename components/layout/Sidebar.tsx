import type { PostType } from "@/types/App";
import Link from "next/link";

type SideBarProps = {
  posts: PostType[];
  slug: string;
  app: string;
  category: string;
};

function Sidebar({ posts, slug, app, category }: SideBarProps) {
  return (
    <div className="hidden sm:flex flex-col w-40 md:w-60 max-h-[calc(100vh-68px)] sticky top-17 py-5 pr-3 overflow-auto">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/apps/${app}/${category}/${post.slug}`}
          className={` rounded hover:bg-gray-300 dark:hover:bg-gray-900 px-4 py-2 transition-colors!
                    ${post.slug === slug ? "text-blue-600 dark:text-blue-500" : "text-gray-700 dark:text-gray-300"}`}
        >
          {post.sidetitle || post.title}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
