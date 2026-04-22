export default function ReviewCard({ review }: any) {
  return (
    <div className="border p-4 rounded-lg">
      <p className="text-sm text-gray-500">{review.language}</p>
      <p className="text-xs text-gray-400">
        {new Date(review.createdAt).toLocaleString()}
      </p>
      <pre className="mt-2 text-sm overflow-x-auto">
        {review.code.slice(0, 200)}...
      </pre>
    </div>
  );
}