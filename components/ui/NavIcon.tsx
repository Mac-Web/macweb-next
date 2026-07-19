import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const icons: string[] = [
  "user",
  "cat",
  "crine",
  "dog",
  "knight",
  "poop",
  "robot",
  "skull",
  "github",
];

async function NavIcon() {
  const session = await auth.api.getSession({ headers: await headers() });
  const existingUser = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  return (
    <Image
      src={
        session?.user.image || `/icons/${icons[existingUser?.picture || 0]}.svg`
      }
      alt="Avatar"
      title="Avatar"
      className="invert dark:invert-0 border-2 border-gray-500 dark:border-gray-700 rounded-full"
      width={40}
      height={40}
    />
  );
}

export default NavIcon;
