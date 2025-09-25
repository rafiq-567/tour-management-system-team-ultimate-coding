import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Hero from "@/components/shared/Hero";
import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import TravellerForm from "@/components/shared/TravellerForm";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import LoginButton from "./components/loginButton/LoginButton";
import FAQ from "@/components/shared/FAQ";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <> 
      <div>
        <p>push kora problem</p>
        <LoginButton />
        <Link href="/register">
          <button className='bg-black text-white px-3 py-2 rounded-xl ml-2'>
            register
          </button>
        </Link>
      </div>

      <Hero />
      <PopularDestinations />
      <Link className="flex justify-center" href="/TourPackeg">
        Tour packeg
      </Link>
      <WhyChooseUs />
      <TravelersSay />
      <FAQ />
      <TravellerForm />
    </>
  );
}