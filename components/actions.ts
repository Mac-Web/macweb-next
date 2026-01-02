"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import { CredentialsType } from "@/types/User";

export async function userSignUp(credentials: CredentialsType) {
  const { username, display, password } = credentials;
  if (!username || !display || !password) {
    return { error: "Missing fields" };
  }
  await dbConnect();
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    const hashedPassword = await hash(password, 12);
    await User.create({ username, display: display, password: hashedPassword });
    return { success: true };
  } else {
    return { error: "Username is in use" };
  }
}
