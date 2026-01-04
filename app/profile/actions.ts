"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

export async function deleteAccount(id: string, tokenID: string) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.id === tokenID) {
      await dbConnect();
      await User.findByIdAndDelete(id);
    }
  } catch (err) {
    console.error(err);
  }
}
