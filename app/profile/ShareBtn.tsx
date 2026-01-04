"use client";

function ShareBtn({ id }: { id: string }) {
  const url = process.env.NEXT_PUBLIC_ROOT_URL!;

  return (
    <div onClick={() => navigator.clipboard.writeText(`${url}/profile/${id}`)} className="w-fit text-blue-600 hover:underline">
      Share profile
    </div>
  );
}

export default ShareBtn;
