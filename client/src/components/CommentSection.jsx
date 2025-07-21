import { useState, useEffect } from 'react';
import noteService from '../services/noteService';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CommentSection = ({ noteId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userInfo } = useAuthStore();

  const fetchComments = async () => {
    try {
      const data = await noteService.getCommentsForNote(noteId);
      setComments(data);
    } catch (error) {
      toast.error('Could not load comments.', error);
    }
  };

  useEffect(() => {
    if (noteId) {
      fetchComments();
    }
  }, [noteId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    try {
      await noteService.createComment(noteId, { text: newComment });
      setNewComment('');
      toast.success('Comment posted!');
      fetchComments(); // Refresh the comments list
    } catch (error) {
      toast.error('Failed to post comment.', error);
    }
  };

  return (
    <section className="mt-8 pt-6 border-t-2 border-gray-200">
      <h2 className="text-2xl font-bold text-[#6e48aa] mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        Comments ({comments.length})
      </h2>

      {/* Comment Form for logged-in users */}
      {userInfo ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a public comment..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md border-2 border-black"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-center p-4 bg-gray-100 rounded-xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          <Link to="/login" className="font-bold text-[#6e48aa] hover:underline">Log in</Link> to post a comment.
        </p>
      )}

      {/* Display Comments */}
      <div className="space-y-4">
        {comments
          .filter(comment => comment?.user) // skip if comment.user is null or undefined
          .map(comment => (
            <div key={comment._id} className="flex items-start space-x-3">
              <img
                src={
                  comment?.user?.profilePicture
                    ? `${import.meta.env.VITE_BACKEND_URL}${comment.user.profilePicture}`
                    : '/default-avatar.png'
                }
                alt={comment.user.name}
                className="w-10 h-10 rounded-full border-2 border-black"
              />


              <div className="flex-1">
                <p
                  className="font-bold text-gray-800"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  {comment.user.name}
                </p>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
      </div>

    </section>
  );
};

export default CommentSection;