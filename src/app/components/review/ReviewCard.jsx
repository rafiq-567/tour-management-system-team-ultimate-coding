import Image from "next/image";

export function ReviewCard({ review }) {
  return (
    <div className="bg-base-300 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={review.image || "/default-avatar.png"}
          alt={review.name || "User"}
          width={40}
          height={40}
          className="rounded-full border"
        />
        <div>
          <p className="font-semibold">{review?.name || "Anonymous"}</p>
          <p className="text-yellow-500 text-sm">
            {"★".repeat(review?.rating)}
          </p>
        </div>
      </div>
      <p className="text-gray-500">{review?.message}</p>
    </div>
  );
}
