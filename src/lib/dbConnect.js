
// 'use server';
// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// };

// // Cache client across hot reloads in dev
// let cachedClient = global._mongoClient;
// let cachedDb = global._mongoDb;

// if (!cachedClient) {
//   cachedClient = null;
//   cachedDb = null;
// }

// export default async function dbConnect(collectionName) {
//   if (!cachedClient || !cachedDb) {
//     const client = new MongoClient(uri, options);
//     await client.connect();
//     const db = client.db("tour_managment_system"); // ✅ your real DB name

//     cachedClient = client;
//     cachedDb = db;

//     // cache globally (for Next.js hot reload)
//     global._mongoClient = client;
//     global._mongoDb = db;
//   }

//   // ✅ If user asks for a collection, return it (like NextAuth)
//   if (collectionName) {
//     return cachedDb.collection(collectionName);
//   }

//   // ✅ Otherwise return the client and db (like API routes)
//   return { client: cachedClient, db: cachedDb };
// }


'use server';

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// ✅ Keep global cache for dev hot reloads (Next.js behavior)
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  const client = await global._mongoClientPromise;
  const db = client.db("tour_managment_system"); // ✅ Ensure correct name

  // ✅ If a collection name is provided, return it
  if (collectionName) {
    return db.collection(collectionName);
  }

  // ✅ Otherwise return the client and db
  return { client, db };
}
