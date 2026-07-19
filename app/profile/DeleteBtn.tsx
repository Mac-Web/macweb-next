"use client";

import type { User } from "better-auth";
import { deleteAccount } from "./actions";

function DeleteBtn({ existingUser }: { existingUser: User }) {
  async function handleDelete() {
    if (
      confirm(
        existingUser?.name +
          ", are you sure you want to permanently delete your MacWeb account? This will wipe all your data from all of our apps. This action cannot be undone.",
      )
    ) {
      await deleteAccount(existingUser.id);
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
