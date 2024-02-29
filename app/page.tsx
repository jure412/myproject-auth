"use client";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  // const data = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  console.log({ session });
  return (
    <div>
      {status === "authenticated" ? (
        <span>
          <span>Name: {session?.user.email || "No name"}</span>
          <span
            style={{ marginLeft: "100px" }}
            onClick={() => {
              signOut();
            }}
          >
            logout
          </span>
        </span>
      ) : (
        <span>you are loggred out</span>
      )}
    </div>
  );
}
