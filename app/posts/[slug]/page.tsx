import type { AppType, GroupedType } from "@/types/App";
import { notFound } from "next/navigation";
import postsData from "@/content/posts.json";
import Hero from "@/components/layout/Hero";
import Sidebar from "@/components/layout/Sidebar";

const posts = postsData as AppType;

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const articleData = posts.posts.find((post) => post.slug === slug);
  if (!articleData) notFound();
  const sortedPosts = posts.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const groupedPosts = sortedPosts.reduce((acc: GroupedType, post) => {
    const year = new Date(post.date).getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  return (
    <div className="px-5 md:px-20 lg:px-[calc(50%-550px)] flex">
      <Sidebar posts={groupedPosts} slug={slug} app={"macvg"} isPost={true} category={slug[0]} />
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

export default Page;
