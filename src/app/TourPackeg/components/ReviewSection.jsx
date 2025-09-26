import { Star } from "lucide-react";
import Image from "next/image";

export default function ReviewSection({ reviews = [] }) {
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-xl shadow-sm bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={review.profileImg}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < review.rating ? "fill-yellow-500" : ""}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{review.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
