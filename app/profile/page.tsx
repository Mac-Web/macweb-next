import Profile from "./Profile";

function Page() {
  return (
    <div className="flex py-5 px-30 gap-x-5">
      <Profile />
      <div className="flex-1 flex flex-col gap-y-5">
        <div className="bg-gray-900 rounded-lg py-5 px-10">
          <h2 className="text-white text-xl font-bold mb-5">About</h2>
          <p className="text-gray-100">About coming soon!</p>
        </div>
        <div className="bg-gray-900 rounded-lg py-5 px-10">
          <h2 className="text-white text-xl font-bold mb-5">Achievements</h2>
          <p className="text-gray-100">Achievements coming soon!</p>
        </div>
        <div className="bg-gray-900 rounded-lg py-5 px-10">
          <h2 className="text-white text-xl font-bold mb-5">Favorited Games</h2>
          <p className="text-gray-100">Favorited games coming soon!</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
