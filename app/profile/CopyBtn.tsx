"use client";

import { BiCopy } from "react-icons/bi";

function CopyBtn({ userID }: { userID: string }) {
  return (
    <BiCopy size={25} title="Copy user ID" className="cursor-pointer" onClick={() => navigator.clipboard.writeText(userID)} />
  );
}

export default CopyBtn;
