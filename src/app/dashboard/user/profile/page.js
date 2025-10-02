import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';
import UserPhoto from './component/UserPhoto';

const profile = async () => {
    const data = await getServerSession(authOptions);
    console.log(data);
    const res = await fetch(`http://localhost:3000/api/allUsers/${data?.user?.email}`,{cache: "force-cache"});
    const resultUser = await res.json();
    console.log(resultUser)
    
    return (
        <div className="bg-gray-100">
            <UserPhoto resultUser={resultUser} />
            
        </div>
    );
};

export default profile;