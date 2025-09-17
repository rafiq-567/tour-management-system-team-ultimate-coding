
'use client'
import Link from "next/link";
import React, {  useEffect, useState } from "react";

const TourPackeg =  () => {


  const [tourData, setTourData] = useState([]);
  useEffect(() => {
    fetch("/tourData.json")
      .then((res) => res.json())
      .then((data) => setTourData(data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10">
        Chooes your Best <span className="text-blue-600">tour</span> packege
      </h1>
      <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {tourData.map((tour) => {
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
                className="my-8 inline-block  px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Detailes
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourPackeg;
