import type { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import PostCard from "@/components/ui/PostCard";

export const metadata: Metadata = {
  title: "Apps | MacWeb",
  description: "Check out more information on our apps and future projects here!",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "Apps | MacWeb",
    description: "Check out more information on our apps and future projects here!",
    url: "https://macweb.app/apps",
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

function Page() {
  return (
    <div className="flex flex-col items-center gap-y-10 mb-10">
      <Hero title="MacWeb Apps" description="Check out more information on our apps and future projects here!" />
      <div className="flex justify-center gap-x-7 flex-wrap px-25">
        <PostCard
          img="/logos/macvg.png"
          href="/apps/macvg"
          title="MacVG"
          description="The best gaming platform with hundreds of games"
        />
        <PostCard
          img="/logos/maclearn.png"
          href="/apps/maclearn"
          title="MacLearn"
          description="Learn, strengthen, and master new web development skills"
        />
        <PostCard
          img="/logos/macweb.png"
          href="/apps/macweb"
          title="MacWeb"
          description="Your best internet bud for productivity and entertainment"
        />
      </div>
    </div>
  );
}

export default Page;
