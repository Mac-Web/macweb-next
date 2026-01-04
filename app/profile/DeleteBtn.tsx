"use client";

import { UserType } from "@/types/User";
import { getSession } from "next-auth/react";
import { deleteAccount } from "./actions";
import { signOut } from "next-auth/react";

type SessionUserType = {
  name?: string;
  email?: string;
  image?: string;
  id: string;
};

function DeleteBtn({ existingUser }: { existingUser: UserType }) {
  async function handleDelete() {
    if (
      confirm(
        existingUser?.display +
          ", are you sure you want to permanently delete your MacWeb account? This will wipe all your data from all of our apps. This action cannot be undone."
      )
    ) {
      const session = await getSession();
      const sessionUser = session?.user as SessionUserType;
      await deleteAccount(existingUser._id, sessionUser?.id);
      signOut();
    }
  }

  return (
    <button
      className="rounded bg-red-600 hover:bg-red-700 cursor-pointer duration-300 text-white font-bold py-1.5 px-3 w-fit"
      onClick={handleDelete}
    >
      Delete account
    </button>
  );
}

export default DeleteBtn;
