import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Hero from "@/components/shared/Hero";
import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import TravellerForm from "@/components/shared/TravellerForm";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import FAQ from "@/components/shared/FAQ";
import HomepageDiscounts from "@/components/Home/HomepageDiscounts";
import CheckoutButton from "./components/CheckoutButton";
import TravelBlogSection from "@/components/Home/TravelBlogSection";
import PromoSlider from "@/components/utilities/PromoSlider";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <> 
      <div>
        
        {/* <Hero></Hero> */}
        <PromoSlider></PromoSlider>
        <PopularDestinations></PopularDestinations>
        <HomepageDiscounts></HomepageDiscounts>
        <WhyChooseUs></WhyChooseUs>
        <TravelersSay></TravelersSay>
        <TravelBlogSection></TravelBlogSection>
        <FAQ> </FAQ>
        <TravellerForm></TravellerForm>
         <CheckoutButton orderId="ORDER123" amount={500} />
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