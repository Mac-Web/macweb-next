import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { FaTrophy } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import About from "../About";
import Profile from "../Profile";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (existingUser) {
    const title = `${existingUser.name}'s Profile | MacWeb`;
    const description = `View ${existingUser.name}'s MacWeb profile, including their about, achievements, favorited games/articles, and more!`;
    return {
      title,
      description,
      authors: [{ name: "MacWeb", url: "https://macweb.app" }],
      openGraph: {
        title,
        description,
        url: `https://macweb.app/profile/${id}`,
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
  } else {
    notFound();
  }
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) redirect("/");

  return (
    <div className="flex flex-col sm:flex-row py-5 px-5 md:px-20 lg:px-[calc(50%-550px)] gap-5">
      <Profile existingUser={existingUser} viewer={true} />
      <div className="flex-1 flex flex-col gap-y-5">
        <About existingUser={existingUser} viewer={true} />
        {/* <div className="profile-section">
              <h2 className="profile-header">
                <FaTrophy size={25} /> Achievements
              </h2>
              <p className="text-gray-800 dark:text-gray-100">Achievements coming soon!</p>
            </div>
            <div className="profile-section">
              <h2 className="profile-header">
                <IoGameController size={25} /> Favorited Games
              </h2>
              <p className="text-gray-800 dark:text-gray-100">Favorited games coming soon!</p>
            </div>
            <div className="profile-section">
              <h2 className="profile-header">
                <MdArticle size={25} /> Favorited Articles
              </h2>
              <p className="text-gray-800 dark:text-gray-100">Favorited articles coming soon!</p>
            </div> */}
      </div>
    </div>
  );
}

export default Page;
