import type { AppType, GroupedType } from "@/types/App";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import Hero from "@/components/layout/Hero";
import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/ui/PostCard";

const apps: Record<string, string> = { macvg: "MacVG", maclearn: "MacLearn", macweb: "MacWeb" };
const categories: Record<string, string> = { updates: "Update", tips: "Tip" };

async function Page({ params }: { params: { app: string; slug: string[] } }) {
  const { app, slug } = await params;
  if (!apps[app] || !categories[slug[0]] || slug.length > 2) notFound();
  const filePath = path.join(process.cwd(), "content", "apps", `${app}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const appData = JSON.parse(fileContent) as AppType;
  const articleData = appData.posts.find((post) => post.slug === slug[1])!;
  if (!articleData && slug.length === 2) notFound();
  const sortedPosts = appData.posts
    .filter((post) => post.category === categories[slug[0]])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const groupedPosts = sortedPosts.reduce((acc: GroupedType, post) => {
    const year = new Date(post.date).getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  if (slug.length === 2) {
    return (
      <div className="px-5 md:px-20 lg:px-[calc(50%-550px)] flex">
        <Sidebar posts={groupedPosts} slug={slug[1]} app={app} category={slug[0]} />
        <div className="flex-1 pl-0 sm:pl-5 md:pl-15">
          <Hero title={articleData.title} />
          <div className="flex justify-between">
            <h3 className="text-gray-700 dark:text-gray-300 font-bold flex items-end gap-x-5 w-full py-2">
              <span className="date">{new Date(articleData.date).toLocaleDateString()}</span>
              <span>By {articleData.author}</span>
            </h3>
          </div>
          <hr className="h-1.25 border-0 bg-blue-600 rounded-full" />
          <div className="flex flex-col gap-y-10 py-10">
            <div className="py-2 text-[18px] text-gray-700 dark:text-gray-300 leading-7.5">{articleData.content.description}</div>
            <h2 className="font-bold text-2xl">Table of Contents</h2>
            <div className="flex flex-col gap-y-3">
              {articleData.content.menulinks.map((link, i) => (
                <a key={i} href={"#" + i} className="hover:underline w-fit text-gray-700 dark:text-gray-300">
                  {link}
                </a>
              ))}
            </div>
            {articleData.content.paragraphs.map((paragraph, i) => {
              return (
                <div key={i} id={(i + 1).toString()}>
                  <h2 className="font-bold text-2xl">{paragraph.title}</h2>
                  <div className="py-2 text-[18px] text-gray-700 dark:text-gray-300 leading-7.5">{paragraph.content}</div>
                </div>
              );
            })}
            <h2 className="font-bold text-2xl" id={articleData.content.paragraphs.length.toString()}>
              Other Improvements, Changes, and Fixes include:
            </h2>
            <ul className="list-disc list-inside leading-10 py-2 text-[18px] text-gray-700 dark:text-gray-300 ">
              {articleData.content.others.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title={apps[app] + " " + slug[0][0].toUpperCase() + slug[0].slice(1)}
        description={`Check out every ${apps[app]} update here!`}
      />
      <div className="flex justify-center gap-7 flex-wrap px-25 py-10">
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            href={`/apps/${app}/${slug[0]}/${post.slug}`}
            title={post.sidetitle || post.title}
            img={`/logos/${app}.png`}
            description={post.description || post.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
