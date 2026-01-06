"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type SessionUserType = {
  name?: string;
  email?: string;
  image?: string;
  id: string;
};

export async function updateAbout(id: string, about: string) {
  try {
    await dbConnect();
    const newUser = await User.findByIdAndUpdate(id, { about });
    if (!newUser) {
      return { error: "Error: user not found" };
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateProfilePicture(id: string, picture: number) {
  try {
    await dbConnect();
    const newUser = await User.findByIdAndUpdate(id, { picture });
    if (!newUser) {
      return { error: "Error: user not found" };
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateDisplayName(id: string, display: string) {
  try {
    await dbConnect();
    const newUser = await User.findByIdAndUpdate(id, { display });
    if (!newUser) {
      return { error: "Error: user not found" };
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAccount(id: string, tokenID: string) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as SessionUserType;
    if (sessionUser.id === tokenID) {
      await dbConnect();
      await User.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error(err);
  }
}
