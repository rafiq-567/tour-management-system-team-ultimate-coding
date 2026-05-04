import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';
import UserPhoto from './component/UserPhoto';

const profile = async () => {
    const data = await getServerSession(authOptions);
    
    let resultUser = null;
    
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/allUsers/${data?.user?.email}`, {cache: "no-store"});
        if (res.ok) {
            resultUser = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
    
    return (
        <div className="bg-gray-100">
            <UserPhoto resultUser={resultUser} />
        </div>
    );
};

export default profile;