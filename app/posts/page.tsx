import type { AppType } from "@/types/App";
import postsData from "@/content/posts.json";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";

const posts = postsData as AppType;

function Page() {
  return (
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <Hero title="Posts" description="You can find posts for tips and ideas about our apps or just about anything else here!" />
      <div className="flex justify-center gap-7 flex-wrap px-25">
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
