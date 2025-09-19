"use server";
import dbConnect from '@/lib/dbConnect';
import React from 'react';

const registerApi = async (payload) => {

    // user validation
    const userData = await dbConnect("user").findOne({username: payload.username});
    
    if (userData) {
        return null;
    }

    try {
        const result = await dbConnect("user").insertOne(payload);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default registerApi;