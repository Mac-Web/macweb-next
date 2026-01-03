import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { UserType } from "@/types/User";
import CopyBtn from "./CopyBtn";
import Image from "next/image";

function Profile({ existingUser }: { existingUser: UserType }) {
  return (
    <div className="flex flex-col gap-y-7 rounded-lg bg-gray-900 w-85 p-10 h-fit">
      {existingUser.image ? (
        <Image
          src={existingUser.image}
          alt={existingUser.display + " Avatar"}
          width={150}
          height={150}
          className="rounded-full cursor-pointer"
        />
      ) : (
        <FaUser size={150} className="rounded-full border-5 border-gray-700 cursor-pointer" color="white" />
      )}
      <div className="flex flex-col gap-y-1">
        <h2 className="text-white text-3xl font-bold">{existingUser.display}</h2>
        <div className="text-gray-100">{existingUser.username}</div>
      </div>
      {existingUser.email && (
        <div className="flex items-center gap-x-3 text-gray-100">
          <MdEmail size={25} title="Email" /> {existingUser.email}
        </div>
      )}
      <div className="flex items-center gap-x-3 text-gray-100">
        <BiCalendar size={25} title="Account created" /> {new Date(existingUser.createdAt).toLocaleDateString()}
      </div>
      <div className="flex items-center gap-x-3 text-gray-100">
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
    </div>
  );
}

export default Profile;
