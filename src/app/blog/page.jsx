"use client";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    image: "",
    rating: 0,
  });

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // stop if already submitting

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({
          title: "",
          description: "",
          author: "",
          image: "",
          rating: 0,
        });
        await fetchBlogs();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-base-200 py-10 px-6 flex lg:flex-row-reverse gap-4 flex-col">
    
      <div className="lg:w-4/12 w-full mx-auto bg-base-200 ">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        🌍 Travel Blogs & Reviews
      </h1>
        {/* Blog Create Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-black-700">
            ✍️ Create New Blog
          </h2>
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full mb-3 p-2 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Blog Description"
            className="w-full mb-3 p-2 border rounded"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-3 p-2 border rounded"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full mb-3 p-2 border rounded"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-3">
            <p className="font-medium text-gray-600">Your Rating:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`cursor-pointer text-2xl ${
                  form.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md mt-2 cursor-pointer"
          >
            Publish Blog
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="lg:w-8/12 w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mx-auto">
      
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {blog.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>👤 {blog.author}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                {/* Display Stars */}
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        blog.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No blogs yet. Be the first to post!
          </p>
        )}
      </div>
    </div>
  );
}
