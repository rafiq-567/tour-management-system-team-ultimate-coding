import Image from "next/image";

import BookingClient from "@/components/booking/BookingClient";
import ReviewSection from "../components/ReviewSection";

export const getSingleTourdata = async (id) => {
  console.log(id)
  const res = await fetch(
    "https://tour-management-system-team-ultimat-lovat.vercel.app/tourData.json"
  );
  const data = await res.json();
  return data.find((tour) => tour.id === parseInt(id));
};

export default async function SingleTourPage({ params }) {
  const { id } = params;
  const tour = await getSingleTourdata(id);

  if (!tour) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="w-11/12 mx-auto mt-10 border-2 border-gray-100 p-2">
      <div className="relative w-full md:h-[450px] h-64">
        <Image
          src={tour.image}
          alt="Tour Image"
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div>
        <h2 className="md:text-3xl text-xl font-bold my-6">{tour.title}</h2>
        <p className="text-gray-400">{tour.description}</p>
        <div className="md:flex justify-between items-center gap-3">
          <p className="mt-2 font-semibold">Duration: {tour.duration}</p>
          <p className="text-blue-600 font-bold mb-4 outline-1 p-3 mt-5 md:mt-0 rounded-xl hover:bg-amber-500 duration-300 transition-all hover:text-white">
            Price: {tour.price}
          </p>
        </div>

        {/* client-side booking system */}
        <BookingClient tour={tour} />
      </div>

      <ReviewSection reviews={tour.reviews} />
    </div>
  );
}
