interface Comment {
  content: string;
  authorName: string;
  createdAt: string;
}

interface HistoryCommentProps {
  comment: Comment;
}

const HistoryComment: React.FC<HistoryCommentProps> = ({ comment }) => {
  return (
    <div className="p-4 border-2 border-gray-300 rounded-md bg-gray-50">
      {/* Render content of the comment */}
      <p className="text-lg text-gray-700">{comment.content}</p>

      {/* Display author name */}
      <p className="text-sm text-gray-500">by {comment.authorName}</p>

      {/* Display the date and time the comment was created */}
      {comment.createdAt && (
        <p className="mt-2 text-sm text-gray-400">
          {new Date(comment.createdAt).toLocaleString("en-GB", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      )}
    </div>
  );
};

export default HistoryComment;
