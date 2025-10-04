'use server'
import { MongoClient, ServerApiVersion } from "mongodb";
// database connection start here abul kalam ***********************
// import React from 'react';

function dbConnect(collectionName) {

    const uri = process.env.MONGODB_URI

    // sslcommerz
     
// Store ID: ultim68dbeb79a741c
// Store Password(API / Secret Key): ultim68dbeb79a741c @ssl


// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
// Store name: testultimgt24
// Registered URL: www.test - project.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
// Validation API(Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            maxPoolSize: 10,
        },
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}
export default dbConnect;