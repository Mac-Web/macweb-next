"use client";

function ShareBtn({ id }: { id: string }) {
  function handleShare() {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_ROOT_URL}/profile/${id}`);
    alert("Public profile link copied to clipboard!");
  }

  return (
    <div onClick={handleShare} className="w-fit text-blue-600 hover:underline cursor-pointer">
      Share profile
    </div>
  );
}

export default ShareBtn;
