import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Hero from "@/components/shared/Hero";
import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import LoginButton from "./components/loginButton/LoginButton";

  

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      hello ultimate coding team members
      <div>
        <Hero></Hero>

        <Link href="/register">
            <button
              className='bg-black text-white px-3 py-2 rounded-xl ml-2'
            >register</button>
          </Link>

          <LoginButton></LoginButton>

        <PopularDestinations></PopularDestinations>
        <Link className=" flex justify-center " href="/TourPackeg">
          Tour packeg
        </Link>
        <WhyChooseUs></WhyChooseUs>
        <TravelersSay></TravelersSay>
      </div>
    </div>
  );
}
