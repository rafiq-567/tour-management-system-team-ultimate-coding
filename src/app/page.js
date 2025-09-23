import FAQ from "@/components/shared/FAQ";
import Hero from "@/components/shared/Hero";
import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import WhyChooseUs from "@/components/shared/WhyChooseUs";

import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div>
        <Hero></Hero>
        <PopularDestinations></PopularDestinations>
        <Link className=" flex justify-center " href="/TourPackeg">
          Tour packeg
        </Link>
        <WhyChooseUs></WhyChooseUs>
        <TravelersSay></TravelersSay>
        <FAQ> </FAQ>
      </div>
    </div>
  );
}
