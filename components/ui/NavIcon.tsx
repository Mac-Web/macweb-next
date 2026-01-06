import { getServerSession } from "next-auth";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import Image from "next/image";

const icons: string[] = ["user", "cat", "crine", "dog", "knight", "poop", "robot", "skull", "github"];

async function NavIcon() {
  const session = await getServerSession();
  await dbConnect();
  const res = await User.findOne({ username: session?.user?.email ? session.user.email : session?.user?.name }).lean();
  const existingUser = JSON.parse(JSON.stringify(res));

  return (
    <Image
      src={`/icons/${icons[existingUser.picture || 0]}.svg`}
      alt="Avatar"
      title="Avatar"
      className="invert dark:invert-0 border-2 border-gray-500 dark:border-gray-700 rounded-full"
      width={40}
      height={40}
    />
  );
}

export default NavIcon;
