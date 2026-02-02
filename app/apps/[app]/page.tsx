import type { AppType } from "@/types/App";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";
import Link from "next/link";

const apps = ["macvg", "maclearn", "macweb"];

async function getAppData(app: string): Promise<AppType> {
  if (!apps.includes(app)) notFound();
  const filePath = path.join(process.cwd(), "content", "apps", `${app}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent) as AppType;
}

export async function generateMetadata({ params }: { params: { app: string } }) {
  const { app } = await params;
  const appData = await getAppData(app);
  const title = `About ${appData.name} | MacWeb`;
  return {
    title,
    description: appData.description,
    authors: [{ name: "MacWeb", url: "https://macweb.app" }],
    openGraph: {
      title,
      description: appData.description,
      url: `https://macweb.app/${app}`,
      siteName: "MacWeb",
      images: [
        {
          url: "/logo.png",
          width: 100,
          height: 100,
        },
      ],
      type: "website",
    },
  };
}

async function Page({ params }: { params: { app: string } }) {
  const { app } = await params;
  const appData = await getAppData(app);
  const appTips = appData.posts.filter((post) => post.category === "Tip");
  const appUpdates = appData.posts.filter((post) => post.category === "Update");

  return (
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <Hero title={appData.name} description={appData.description} />
      <h2 className="text-center text-2xl font-bold">Tips & Documentation</h2>
      <div className="flex justify-center gap-x-7 flex-wrap">
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
      <div className="flex justify-center gap-7 flex-wrap">
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
