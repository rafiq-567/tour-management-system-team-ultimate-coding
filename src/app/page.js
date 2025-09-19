import TourPackeg from "@/componets/TourPackeg";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./components/loginButton/LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <div>hello ultimate coding team members</div>
      <Link className=" flex justify-center " href="/TourPackeg">
        Tour packeg
      </Link>
      <div>
        <p>push kora problem</p>
        <LoginButton></LoginButton>
        <Link href="/register">
          <button
            className='bg-black text-white px-3 py-2 rounded-xl ml-2'
          >register</button>
        </Link>
      </div>
    </>
  );
}
