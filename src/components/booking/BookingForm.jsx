// "use client";
// import { useState } from "react";

// export default function BookingForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     contactNumber: "",
//     adults: 1,
//     children: 0,
//     startDate: "",
//     endDate: "",
//     from: "",
//     to: "",
//     hotelType: "VIP",
//     rooms: 1,

//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.includes("food.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         food: { ...prev.food, [key]: checked }
//       }));
//     } else if (name.includes("transport.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         transport: {
//           ...prev.transport,
//           [key]: type === "checkbox" ? checked : value
//         }
//       }));
//     } else if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* User Info */}
//       <h3 className="font-semibold text-lg">User Information</h3>
//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//         required
//       />
//       <input
//         type="text"
//         name="contactNumber"
//         placeholder="Contact Number"
//         value={formData.contactNumber}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//         required
//       />
//       <div className="flex gap-2">
//         <input
//           type="number"
//           name="adults"
//           placeholder="Adults"
//           value={formData.adults}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//           min="1"
//         />
//         <input
//           type="number"
//           name="children"
//           placeholder="Children"
//           value={formData.children}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//           min="0"
//         />
//       </div>

//       {/* Tour Details */}
//       <h3 className="font-semibold text-lg">Tour Details</h3>
//       <div className="flex gap-2">
//         <input
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//         />
//         <input
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//         />
//       </div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           name="from"
//           placeholder="From"
//           value={formData.from}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="to"
//           placeholder="To"
//           value={formData.to}
//           onChange={handleChange}
//           className="w-1/2 border p-2 rounded"
//         />
//       </div>

//       {/* Hotel */}
//      <h3 className="font-semibold text-lg">Accommodation</h3>
//       <select
//         name="hotelType"
//         value={formData.hotelType}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       >
//         <option value="VIP">VIP - 2000tk</option>
//         <option value="Medium">Medium - 1500tk</option>
//         <option value="Low">Low - 1000tk</option>
//       </select>
//       <input
//         type="number"
//         name="rooms"
//         placeholder="Number of Rooms"
//         value={formData.rooms}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//         min="1"
//       />






//       {/* Submit */}
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         Submit Booking
//       </button>
//     </form>
//   );
// }
