import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";


export default async function tourDataDetails({ params }) {
  const p = await params;
 const detailaCollection  = dbConnect('tourPackegdata');
 const tour = await detailaCollection.findOne({_id: new ObjectId(p.id)})


  if (!tour) {
    return <h1>Not found</h1>;
  }
  return (
    <div className="w-11/12 mx-auto mt-10 border-2 border-gray-100 p-2 ">
      <div className=" ">
        <Image
          src={tour.image} 
          width={100}
          height={100}
          className="md:w-full md:h-[450px] w-full rounded-xl"
          alt="toru-photo"
        />
      </div>
      <div>
        <h2 className="md:text-3xl text-xl font-bold my-6">{tour.title}</h2>
        <p className="text-gray-400">{tour.description}</p>
       <div className=" md:flex justify-between items-center gap-3">
         <p className="mt-2 font-semibold ">Duration: {tour.duration}</p>
        <p className="text-blue-600 font-bold mb-4 outline-1 p-3 mt-5 md:mt-0 rounded-xl hover:bg-amber-500 duration-300 transition-all  hover:text-white">Price: {tour.price}</p>
       </div>
        <button className=" font-bold mb-8 bg-blue-600 px-5 py-2 rounded-xl hover:bg-amber-500 duration-300 transition-all cursor-pointer " >Book</button>
      </div>
    </div>
  );
}
