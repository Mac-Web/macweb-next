import { getServerSession } from "next-auth";

async function OAuth() {
  const session = await getServerSession();

  if (!session) {
    return <div>You aren&apos;t logged in, peasant.</div>;
  } else {
    console.log(session.user);
  }

  return <div>OAuth</div>;
}

export default OAuth;
