import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { FaTrophy } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import About from "../About";
import Profile from "../Profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile | MacWeb",
  description: "View another person's MacWeb profile, including their about, achievements, favorited games/articles, and more!",
};

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  await dbConnect();
  const res = await User.findById(id).lean();
  const existingUser = JSON.parse(JSON.stringify(res));

  return (
    <div className="flex py-5 px-30 gap-x-5">
      {existingUser ? (
        <>
          <Profile existingUser={existingUser} viewer={true} />
          <div className="flex-1 flex flex-col gap-y-5">
            <About existingUser={existingUser} viewer={true} />
            <div className="profile-section">
              <h2 className="profile-header">
                <FaTrophy size={25} /> Achievements
              </h2>
              <p className="text-gray-100">Achievements coming soon!</p>
            </div>
            <div className="profile-section">
              <h2 className="profile-header">
                <IoGameController size={25} /> Favorited Games
              </h2>
              <p className="text-gray-100">Favorited games coming soon!</p>
            </div>
            <div className="profile-section">
              <h2 className="profile-header">
                <MdArticle size={25} /> Favorited Articles
              </h2>
              <p className="text-gray-100">Favorited articles coming soon!</p>
            </div>
          </div>
        </>
      ) : (
        <div>df</div>
      )}
    </div>
  );
}

export default Page;
