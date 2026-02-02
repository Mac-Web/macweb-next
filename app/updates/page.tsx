import type { AppType } from "@/types/App";
import type { Metadata } from "next";
import macvgPosts from "@/content/apps/macvg.json";
import maclearnPosts from "@/content/apps/maclearn.json";
import macwebPosts from "@/content/apps/macweb.json";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";

export const metadata: Metadata = {
  title: "Updates | MacWeb",
  description: "You can see the 20 most recent posts on new features and changes we're adding to MacWeb apps here!",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "Updates | MacWeb",
    description: "You can see the 20 most recent posts on new features and changes we're adding to MacWeb apps here!",
    url: "https://macweb.app/updates",
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

const macvgData = macvgPosts as AppType;
const maclearnData = maclearnPosts as AppType;
const macwebData = macwebPosts as AppType;

function Page() {
  const allPosts = [...macvgData.posts, ...maclearnData.posts, ...macwebData.posts]
    .filter((post) => post.category === "Update")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <Hero
        title="App Updates"
        description="You can see the 20 most recent posts on new features and changes we're adding to MacWeb apps here!"
      />
      <div className="flex justify-center gap-7 flex-wrap px-25">
        {allPosts.slice(0, 20).map((post, i) => {
          return (
            <PostCard
              key={i}
              img={"/logos/" + post.app.toLowerCase() + ".png"}
              href={`/apps/${post.app.toLowerCase()}/updates/${post.slug}`}
              title={post.sidetitle || post.title}
              description={post.description || post.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
