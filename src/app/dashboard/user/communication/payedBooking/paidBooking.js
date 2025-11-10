"use server";

import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const paidBooking = async (email) => {
  const filter = {
    email,
    paymentStatus: "paid",
  };

  // ✅ Await the collection before calling find()
  const collection = await dbConnect("bookings");
  const result = await collection.find(filter).toArray();

  let newResult = [];
  for (const single of result) {
    const { _id: id, tourId, tourName } = single;

    const tourCollection = await dbConnect("tourPackages");
    const tourResult = await tourCollection.findOne({ _id: new ObjectId(tourId) });

    newResult.push({ id, tourName, image: tourResult?.image });
  }

  return JSON.stringify(newResult);
};

export default paidBooking;
