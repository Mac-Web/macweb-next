import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SigninBtn from "../SigninBtn";
import NavUser from "./NavUser";
import NavIcon from "./NavIcon";

async function User() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SigninBtn />;
  } else {
    return (
      <NavUser user={session.user}>
        <NavIcon />
      </NavUser>
    );
  }
}

export default User;
