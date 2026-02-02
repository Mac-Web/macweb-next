import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { FaTrophy } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import About from "./About";
import Profile from "./Profile";
import SigninBtn from "@/components/SigninBtn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | MacWeb",
  description: "Customize your own profile with a custom display name, profile image, about, and more!",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "My Profile | MacWeb",
    description: "Customize your own profile with a custom display name, profile image, about, and more!",
    url: "https://macweb.app/profile",
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

async function Page() {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const res = await User.findOne({ username: session?.user?.email ? session.user.email : session?.user?.name }).lean();
  const existingUser = JSON.parse(JSON.stringify(res));

  return (
    <div className="flex flex-col sm:flex-row py-5 px-5 md:px-20 lg:px-[calc(50%-550px)] gap-5">
      {session?.user ? (
        <>
          <Profile existingUser={existingUser} />
          <div className="flex-1 flex flex-col gap-y-5">
            <About existingUser={existingUser} />
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
        </>
      ) : (
        <div className="flex flex-col gap-y-10 items-center justify-center w-full h-30 md:h-100">
          <h2 className="text-black dark:text-white text-xl font-bold">Sign in to access user profile</h2>
          <SigninBtn />
        </div>
      )}
    </div>
  );
}

export default Page;
