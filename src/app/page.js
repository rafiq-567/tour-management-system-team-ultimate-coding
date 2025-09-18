import TourPackeg from "@/componets/TourPackeg";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./components/loginButton/LoginButton";

export default function Home() {
  return (
    <>
      <div>hello ultimate coding team members</div>
      <Link className=" flex justify-center " href="/TourPackeg">
        Tour packeg
      </Link>
      <div>
        <p>push kora problem</p>
        <LoginButton></LoginButton>
      </div>
    </>
  );
}
