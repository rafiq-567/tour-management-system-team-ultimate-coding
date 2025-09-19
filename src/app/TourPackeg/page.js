import TourPackeg from "@/componets/TourPackeg";
import Link from "next/link";
export const getpost = async () => {
  const res = await fetch("http://localhost:3000/tourData.json");
  const data = await res.json();
  return data;
};
export default async function TourPackegPage() {
  const post = await getpost();
//   console.log(post);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10">
        Chooes your Best <span className="text-blue-600">tour</span> packege
      </h1>
      <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {post.map((tour) => {
          return (
            <div key={tour.id}>
              <div className="object-center">
                <img
                  src={tour.image}
                  width={300}
                  height={200}
                  className="object-cover"
                  alt="toru-photo"
                />
              </div>
              <h2 className="text-xl font-bold mt-4">{tour.title}</h2>
              <p className="text-gray-400">{tour.description}</p>
              <p className="mt-2 font-semibold">Duration: {tour.duration}</p>
              <p className="text-blue-600 font-bold mb-8">
                Price: {tour.price}
              </p>

              <Link
                href={`/TourPackeg/${tour.id}`}
                className="my-8 inline-block  px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-amber-500 duration-300 transition-all cursor-pointer"
              >
                Detailes
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
