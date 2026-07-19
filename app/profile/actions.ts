"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateAbout(id: string, about: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id === id) {
      await prisma.user.update({
        where: { id },
        data: { about },
      });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateProfilePicture(id: string, picture: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id === id) {
      await prisma.user.update({
        where: { id },
        data: { picture },
      });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateDisplayName(id: string, display: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id === id) {
      await prisma.user.update({
        where: { id },
        data: { name: display },
      });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAccount(id: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id === id) {
      await prisma.user.delete({ where: { id } });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error(err);
  }
}

//TODO: merge the edit actions into one update block function
