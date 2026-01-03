"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";

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
