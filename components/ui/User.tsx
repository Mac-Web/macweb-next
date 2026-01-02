import { getServerSession } from "next-auth";
import SigninBtn from "../SigninBtn";
import NavUser from "./NavUser";

async function User() {
  const session = await getServerSession();

  if (!session) {
    return <SigninBtn />;
  } else {
    return <NavUser user={session.user} />;
  }
}

export default User;
