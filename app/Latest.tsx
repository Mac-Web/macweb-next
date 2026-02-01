import type { AppType } from "@/types/App";
import macvgPosts from "@/content/apps/macvg.json";
import maclearnPosts from "@/content/apps/maclearn.json";
import macwebPosts from "@/content/apps/macweb.json";
import PostCard from "@/components/ui/PostCard";

const macvgData = macvgPosts as AppType;
const maclearnData = maclearnPosts as AppType;
const macwebData = macwebPosts as AppType;

function Latest() {
  const allPosts = [...macvgData.posts, ...maclearnData.posts, ...macwebData.posts]
    .filter((post) => post.category !== "Tip")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex justify-center gap-7 flex-wrap px-25 mt-10 mb-25">
      {allPosts.slice(0, 5).map((post, i) => {
        return (
          <PostCard
            key={i}
            img={"/logos/" + post.app?.toLowerCase() + ".png"}
            href={`/apps/${post.app?.toLowerCase()}/updates/${post.slug}`}
            title={post.sidetitle || post.title}
            description={post.description || post.date}
          />
        );
      })}
    </div>
  );
}

export default Latest;
