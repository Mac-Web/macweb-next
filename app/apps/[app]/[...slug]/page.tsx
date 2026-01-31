import type { AppType } from "@/types/App";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import Hero from "@/components/layout/Hero";
import Sidebar from "@/components/layout/Sidebar";

const apps = ["macvg", "maclearn", "macweb"];

async function Page({ params }: { params: { app: string; slug: string[] } }) {
  const { app, slug } = await params;
  if (!apps.includes(app)) notFound();
  const filePath = path.join(process.cwd(), "content", "apps", `${app}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const appData = JSON.parse(fileContent) as AppType;
  const articleData = appData.posts.find((post) => post.slug === slug[1])!;

  return (
    <div className="px-5 md:px-20 lg:px-[calc(50%-550px)] flex">
      <Sidebar posts={appData.posts.filter((post) => post.category === "Update")} slug={slug[1]} app={app} category="updates" />
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
          {articleData.content.paragraphs.map((paragraph, i) => {
            return (
              <div key={i}>
                <h2 className="font-bold text-2xl">{paragraph.title}</h2>
                <div className="py-2 text-[18px] text-gray-700 dark:text-gray-300 leading-7.5">{paragraph.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
