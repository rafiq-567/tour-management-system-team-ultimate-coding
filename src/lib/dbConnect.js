// 'use server'
// import { MongoClient, ServerApiVersion } from "mongodb";
// // database connection start here abul kalam ***********************
// // import React from 'react';

// function dbConnect(collectionName) {

   

//     const uri = process.env.MONGODB_URI;
//     // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//     const client = new MongoClient(uri, {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//             maxPoolSize: 10,
//         },
//     });
//     return client.db(process.env.DB_NAME).collection(collectionName)
// }
// export default dbConnect;


'use server';
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Cache client across hot reloads in dev
let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

if (!cachedClient) {
  cachedClient = null;
  cachedDb = null;
}

export default async function dbConnect(collectionName) {
  if (!cachedClient || !cachedDb) {
    const client = new MongoClient(uri, options);
    await client.connect();
    const db = client.db("tour_managment_system"); // ✅ your real DB name

    cachedClient = client;
    cachedDb = db;

    // cache globally (for Next.js hot reload)
    global._mongoClient = client;
    global._mongoDb = db;
  }

  // ✅ If user asks for a collection, return it (like NextAuth)
  if (collectionName) {
    return cachedDb.collection(collectionName);
  }

  // ✅ Otherwise return the client and db (like API routes)
  return { client: cachedClient, db: cachedDb };
}
