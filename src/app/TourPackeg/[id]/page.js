import Image from "next/image";
import ReviewSection from "../components/ReviewSection";

export const getSingleTourdata = async (id) => {
  const res = await fetch(
    "https://tour-management-system-team-ultimat-lovat.vercel.app/tourData.json"
  );
  const data = await res.json();
  return data.find((tour) => tour.id === parseInt(id));

  // import { getSingleTour } from "@/lib/singleTour";
};

export default async function singleTourData({ params }) {

  
  const { id } = await params;
  const tour = await getSingleTourdata(id);

  if (!tour) {
    return <h1>Not found</h1>;
  }
  return (
    <div className="w-11/12 mx-auto mt-10 border-2 border-gray-100 p-2 ">
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
        <div className=" md:flex justify-between items-center gap-3">
          <p className="mt-2 font-semibold ">Duration: {tour.duration}</p>
          <p className="text-blue-600 font-bold mb-4 outline-1 p-3 mt-5 md:mt-0 rounded-xl hover:bg-amber-500 duration-300 transition-all  hover:text-white">
            Price: {tour.price}
          </p>
        </div>
        <button className=" font-bold mb-8 bg-blue-600 px-5 py-2 rounded-xl hover:bg-amber-500 duration-300 transition-all cursor-pointer ">
          Book
        </button>
      </div>

      <ReviewSection reviews={tour.reviews} />
    </div>
  );
}
