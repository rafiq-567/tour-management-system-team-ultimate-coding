export function ReviewCard({ review }) {
  return (
    <div className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <img
        src={review.user?.profileImg || "/default-avatar.png"}
        alt={review.user?.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {review.user?.name}
          </h4>
          <span className="text-yellow-500 font-bold">{review.rating} ★</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{review.message}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
