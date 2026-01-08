import ProfileIcon from "./ProfileIcon";
import { MdEmail } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { UserType } from "@/types/User";
import CopyBtn from "./CopyBtn";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import ShareBtn from "./ShareBtn";
import Display from "./Display";

type ProfileProps = {
  existingUser: UserType;
  viewer?: boolean;
};

function Profile({ existingUser, viewer }: ProfileProps) {
  return (
    <div className="flex flex-0.5 flex-col gap-y-7 rounded-lg bg-gray-300 dark:bg-gray-900 sm:w-85 p-10 h-fit">
      {existingUser.image ? (
        <Image
          src={existingUser.image}
          alt={existingUser.display + " Avatar"}
          width={150}
          height={150}
          className={`rounded-full ${viewer ? "" : "cursor-pointer"}`}
        />
      ) : (
        <ProfileIcon existingUser={existingUser} viewer={viewer} />
      )}
      <div className="flex flex-col gap-y-1">
        <Display existingUser={existingUser} viewer={viewer} />
        <div className="text-gray-700 dark:text-gray-200">@{existingUser.username}</div>
        {!viewer && (
          <div className="flex gap-x-5">
            <Link href={`/profile/${existingUser?._id}`} className="w-fit text-blue-600 hover:underline">
              View profile
            </Link>
            <ShareBtn id={existingUser?._id} />
          </div>
        )}
      </div>
      {existingUser.email && (
        <div className="flex items-center gap-x-3 text-gray-800 dark:text-gray-100">
          <MdEmail size={25} title="Email" /> {existingUser.email}
        </div>
      )}
      <div className="flex items-center gap-x-3 text-gray-800 dark:text-gray-100">
        <BiCalendar size={25} title="Account created" /> {new Date(existingUser.createdAt).toLocaleDateString()}
      </div>
      <div className="flex items-center gap-x-3 text-gray-800 dark:text-gray-100">
        <CopyBtn userID={existingUser._id.toString()} /> {existingUser._id.toString()}
      </div>
      {existingUser.provider && (
        <Image
          src={"/oauth/" + existingUser.provider + ".png"}
          alt={existingUser.provider[0].toUpperCase() + existingUser.provider.slice(1)}
          title="Account provider"
          width={25}
          height={25}
        />
      )}
      {!viewer && <DeleteBtn existingUser={existingUser} />}
    </div>
  );
}

export default Profile;
