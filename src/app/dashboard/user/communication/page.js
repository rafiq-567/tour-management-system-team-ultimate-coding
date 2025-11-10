// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';
// import React from 'react';
// import paidBooking from './payedBooking/paidBooking';
// import ChatSystem from './components/ChatSystem';

// const communication = async () => {
//     const {user} = await getServerSession(authOptions);
//     const result = await paidBooking(user?.email);
//     return (
//         <div>
//             <ChatSystem result={result} />
//         </div>
//     );
// };

// export default communication;


// app/dashboard/user/communication/page.jsx (or similar file)

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';
// Note: Ensure the file path to paidBooking is exactly correct.
import paidBooking from './payedBooking/paidBooking'; 
import ChatSystem from './components/ChatSystem';

// This is a Server Component, so 'async' is correctly used here.
const CommunicationPage = async () => {
    // 1. Fetch the user session
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Handle case where session or user is missing (optional client-side redirect needed for robust auth)
    if (!user) {
        // Return null or a simple message, relying on the client-side layout/middleware
        // to handle the unauthenticated redirect.
        return <div>Authentication required.</div>;
    }
    
    // 2. Call the server-side data fetching function
    // 🛑 This call requires the fix in paidBooking.js! 🛑
    const result = await paidBooking(user.email); 
    
    // 3. Render the client component with the fetched data
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Communication Hub</h1>
            <ChatSystem result={result} />
        </div>
    );
};

export default CommunicationPage;