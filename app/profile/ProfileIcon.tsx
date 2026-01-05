"use client";

import { AnimatePresence } from "framer-motion";
import ProfileModal from "@/components/ProfileModal";
import { useState } from "react";
import { UserType } from "@/types/User";
import Image from "next/image";

const icons: string[] = ["user", "cat", "crine", "dog", "knight", "poop", "robot", "skull", "github"];

type ProfileIconProps = {
  existingUser: UserType;
  viewer?: boolean;
};

function ProfileIcon({ existingUser, viewer }: ProfileIconProps) {
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<number>(existingUser.picture || 0);

  return (
    <>
      <Image
        src={`/icons/${icons[selectedIcon]}.svg`}
        alt={icons[selectedIcon][0].toUpperCase() + icons[selectedIcon].slice(1)}
        title={!viewer ? "Edit profile picture" : ""}
        width={150}
        height={150}
        className={`${
          !viewer && "cursor-pointer"
        }  invert dark:invert-0 rounded-full border-4 border-gray-400 dark:border-gray-700 duration-300`}
        onClick={() => {
          if (!viewer) {
            setProfileModalOpen(true);
          }
        }}
      />
      <AnimatePresence>
        {profileModalOpen && !viewer && (
          <ProfileModal
            existingUser={existingUser}
            close={() => setProfileModalOpen(false)}
            icons={icons}
            setSelectedIcon={setSelectedIcon}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProfileIcon;
