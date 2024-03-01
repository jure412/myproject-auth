import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await getServerSession(authOptions);
  console.log({ data });
  return (
    <div>
      <span>
        <span>Name: {data?.user.email || "No name"}</span>
      </span>
    </div>
  );
}
