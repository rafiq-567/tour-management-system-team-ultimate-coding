
import { MongoClient, ServerApiVersion } from "mongodb";
//database connection start here

function dbConnect(collectionName){

    const uri = process.env.MONGODB_URL

import React from 'react';
import { MongoClient, ServerApiVersion } from 'mongodb';

const dbConnect = (collectionName) => {
    const uri = process.env.MONGODB_URI;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,

        },
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}

        }
    });
    return client.db(process.env.DB_TOURS).collection(collectionName);
};


export default dbConnect;