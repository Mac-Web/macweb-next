import type { AppType } from "@/types/App";
import type { Metadata } from "next";
import postsData from "@/content/posts.json";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";

export const metadata: Metadata = {
  title: "Posts | MacWeb",
  description: "You can find posts for tips and ideas about our apps or just about anything else here!",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "Posts | MacWeb",
    description: "You can find posts for tips and ideas about our apps or just about anything else here!",
    url: "https://macweb.app/posts",
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

const posts = postsData as AppType;

function Page() {
  return (
    <div className="flex flex-col items-center gap-y-10 mb-10 px-5 md:px-20 lg:px-[calc(50%-550px)]">
      <Hero title="Posts" description="You can find posts for tips and ideas about our apps or just about anything else here!" />
      <div className="flex justify-center gap-7 flex-wrap">
        {posts.posts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post, i) => {
            return (
              <PostCard
                key={i}
                img={"/logos/" + post.app.toLowerCase() + ".png"}
                href={`/posts/${post.slug}`}
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
