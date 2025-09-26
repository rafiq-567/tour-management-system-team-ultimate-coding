"use server";
import dbConnect from '@/lib/dbConnect';
import React from 'react';

const registerApi = async (payload) => {
    console.log(payload);

    // user validation
    const userData = await dbConnect("user").findOne({email: payload.email});
    
    if (userData) {
        return null;
    }

    try {
        const result = await dbConnect("user").insertOne(payload);
        result.insertedId = result.insertedId.toString();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default registerApi;