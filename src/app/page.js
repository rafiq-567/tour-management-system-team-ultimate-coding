import FAQ from "@/components/shared/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Hero from "@/components/shared/Hero";
import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import TravellerForm from "@/components/shared/TravellerForm";
import WhyChooseUs from "@/components/shared/WhyChooseUs";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <div>
        <Hero></Hero>
        <PopularDestinations></PopularDestinations>
       
        <WhyChooseUs></WhyChooseUs>
        <TravelersSay></TravelersSay>
        <FAQ> </FAQ>
        <TravellerForm></TravellerForm>
      </div>
    </div>
  );
}
