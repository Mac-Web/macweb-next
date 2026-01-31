import type { AppType } from "@/types/App";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";
import Link from "next/link";

//TODO: add not found 404 page

const apps = ["macvg", "maclearn", "macweb"];

async function Page({ params }: { params: { app: string } }) {
  const { app } = await params;
  if (!apps.includes(app)) notFound();
  const filePath = path.join(process.cwd(), "content", "apps", `${app}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const appData = JSON.parse(fileContent) as AppType;
  const appTips = appData.posts.filter((post) => post.category === "Tip");
  const appUpdates = appData.posts.filter((post) => post.category === "Update");

  return (
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <Hero title={appData.name} description={appData.description} />
      <h2 className="text-center text-2xl font-bold">Tips & Documentation</h2>
      <div className="flex justify-center gap-x-7 flex-wrap px-25">
        {appTips.map((post) => {
          return (
            <PostCard
              key={post.id}
              img={"/logos/" + appData.logo}
              href={`/apps/${app}/tips/${post.slug}`}
              title={post.sidetitle || post.title}
              description={post.description || post.date}
            />
          );
        })}
      </div>
      <h2 className="text-center text-2xl font-bold">Updates</h2>
      <div className="flex justify-center gap-x-7 flex-wrap px-25">
        {appUpdates.slice(0, 4).map((post) => {
          return (
            <PostCard
              key={post.id}
              img={"/logos/" + appData.logo}
              href={`/apps/${app}/updates/${post.slug}`}
              title={post.sidetitle || post.title}
              description={post.description || post.date}
            />
          );
        })}
      </div>
      {appUpdates.length > 4 && (
        <Link
          href={`/apps/${app}/updates`}
          className="bg-blue-600 rounded text-white text-lg font-bold py-1.5 px-4 cursor-pointer hover:bg-blue-700 duration-300"
        >
          View All
        </Link>
      )}
    </div>
  );
}

export default Page;
