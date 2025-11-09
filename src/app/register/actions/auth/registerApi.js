// "use server";
// import dbConnect from '@/lib/dbConnect';
// import React from 'react';

// const registerApi = async (payload) => {

//     // user validation
//     const userData = await dbConnect("user").findOne({email: payload.email});
    
//     if (userData) {
//         return null;
//     }

//     try {
//         const result = await dbConnect("user").insertOne(payload);
//         result.insertedId = result.insertedId.toString();
//         return JSON.stringify(result);
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// };

// export default registerApi;

'use server';
import dbConnect from '@/lib/dbConnect';

const registerApi = async (payload) => {
  const userCollection = await dbConnect("user"); // ✅ await the promise

  // user validation
  const userData = await userCollection.findOne({ email: payload.email });
  if (userData) {
    return null;
  }

  try {
    const result = await userCollection.insertOne(payload);
    result.insertedId = result.insertedId.toString();
    return JSON.stringify(result);
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};

export default registerApi;
