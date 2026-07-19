import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SigninBtn from "../SigninBtn";
import NavUser from "./NavUser";
import NavIcon from "./NavIcon";

async function User() {
  const session = await auth.api.getSession({ headers: await headers() });

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
