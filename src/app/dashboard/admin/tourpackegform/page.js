"use client";

import Swal from "sweetalert2";
// tour packeg add form *******************************************************************
export default function TourPackageForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;
    const price = form.price.value;
    const duration = form.duration.value;
    const date = form.createdAt.value;
    const payload = { title, description, image, price, date, duration };
    console.log(payload);
    const res = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.result.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Tour packeg is added Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-green-100 shadow rounded-xl space-y-4 pt-5 text-black"
    >
      <h2 className="text-2xl md:text-4xl font-semibold my-10 text-center">
        <span className="text-blue-500">Create</span> Tour Package
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g. 3 Days / 2 Nights)"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="url"
        name="image"
        placeholder="Image URL"
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="createdAt"
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded font-medium cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
