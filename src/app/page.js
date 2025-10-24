import PopularDestinations from "@/components/shared/PopularDestinations";
import TravelersSay from "@/components/shared/TravelersSay";
import TravellerForm from "@/components/shared/TravellerForm";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import FAQ from "@/components/shared/FAQ";

import TravelBlogSection from "@/components/Home/TravelBlogSection";
import PromoSlider from "@/components/utilities/PromoSlider";
import TourGuides from "@/components/utilities/TourGuides";
import RoomBookPage from "@/components/hotel/RoomBook";
import Discounts from "@/components/Home/HomepageDiscounts";


export default async function Home() {
  return (
    <>
      <div>
        {/* <Hero></Hero> */}
        <PromoSlider></PromoSlider>
        <PopularDestinations></PopularDestinations>
        <Discounts></Discounts>
        <RoomBookPage></RoomBookPage>
        <WhyChooseUs></WhyChooseUs>
        <TravelersSay></TravelersSay>
        <TourGuides></TourGuides>
        <TravelBlogSection></TravelBlogSection>
        <FAQ> </FAQ>
        <TravellerForm></TravellerForm>
        {/* <CheckoutButton orderId="ORDER123" amount={500} /> */}
      </div>
    </>
  );
}
