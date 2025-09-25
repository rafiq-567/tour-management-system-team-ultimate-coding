// import React, { useState } from "react";
// import { MapPin, Mail, Phone } from 'lucide-react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // This is a placeholder for your form submission logic.
//     // In a real application, you would send this data to a backend API.
//     console.log("Form submitted:", formData);
//     alert('Thank you for your message! We will get back to you shortly.');
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 sm:p-8">
//       <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-5xl border border-gray-200 dark:border-gray-700">
//         <div className="text-center mb-10">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
//             Contact Us
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Have questions about our tours or services? Get in touch with our team using the form below, and we'll be happy to help you plan your next adventure.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
//           {/* Contact Form */}
//           <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
//               Send us a message
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   id="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Info and Map */}
//           <div className="md:p-6 space-y-8">
//             <div className="space-y-4">
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
//                 Our Office
//               </h3>
//               <div className="flex items-start">
//                 <MapPin size={24} className="text-blue-500 flex-shrink-0 mt-1" />
//                 <p className="ml-3 text-gray-600 dark:text-gray-400">
//                   123 Tour Street, Traveler's Square, <br /> City of Adventure, 54321
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Mail size={24} className="text-blue-500 flex-shrink-0" />
//                 <a href="mailto:info@tour-ms.com" className="ml-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
//                   info@tour-ms.com
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <Phone size={24} className="text-blue-500 flex-shrink-0" />
//                 <p className="ml-3 text-gray-600 dark:text-gray-400">
//                   +1 (555) 123-4567
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg h-64 w-full">
//               {/* Placeholder for Google Map or an image */}
//               <iframe
//                 title="Google Maps Location"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.218568449767!2d144.9631627153213!3d-37.81720977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b9e831c4f5%3A0x6d9f8d55d7b5b5c9!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614742784013!5m2!1sen!2sau"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
