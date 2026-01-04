"use client";

import { useState } from "react";
import { UserType } from "@/types/User";
import { updateAbout } from "./actions";
import { FaCircleInfo } from "react-icons/fa6";

type AboutProps = {
  existingUser: UserType;
  viewer?: boolean;
};

function About({ existingUser, viewer }: AboutProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(existingUser?.about || "");
  const [localUser, setLocalUser] = useState<UserType>({ ...existingUser });

  async function handleEdit() {
    if (existingUser) {
      if (editing) {
        await updateAbout(existingUser._id, text);
        setLocalUser({ ...localUser, about: text });
        setEditing(false);
      } else {
        setEditing(true);
      }
    }
  }

  return (
    <div className="profile-section">
      <h2 className="profile-header">
        <FaCircleInfo size={25} /> About
      </h2>
      {editing ? (
        <textarea
          className="text-gray-800 dark:text-gray-100 resize-none outline-2 outline-gray-400 dark:outline-gray-700 rounded py-2 px-4"
          value={text}
          placeholder="Put something unique about you..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      ) : (
        <p className="text-gray-800 dark:text-gray-100">{localUser.about || "No about information added"}</p>
      )}
      {!viewer && (
        <button
          className="bg-blue-600 rounded cursor-pointer text-white py-1 px-4 hover:bg-blue-700 duration-300 w-fit"
          onClick={() => handleEdit()}
        >
          {editing ? "Save" : "Edit"}
        </button>
      )}
    </div>
  );
}

export default About;
