import Link from "next/link";
import LoginButton from "./components/loginButton/LoginButton";


export default function Home() {
  return (
    <>
      <Link className=" flex justify-center " href="/TourPackeg">
        Tour packeg
      </Link>
      <div>
        <LoginButton></LoginButton>
      </div>
    </>

  );
}
