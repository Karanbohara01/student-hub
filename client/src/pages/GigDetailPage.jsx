

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gigService from '../services/gigService';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { FaDownload } from 'react-icons/fa';
import chatService from '../services/chatService'; // Import chatService

const GigDetailPage = () => {
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: gigId } = useParams();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const fetchGig = useCallback(async () => {
    try {
      const data = await gigService.getGigById(gigId);
      setGig(data);
    } catch (error) {
      toast.error('Could not fetch gig details.', error);
    } finally {
      setLoading(false);
    }
  }, [gigId]);

  useEffect(() => {
    fetchGig();
  }, [fetchGig]);

  const handleApply = async () => {
    try {
      await gigService.applyForGig(gigId);
      toast.success('Application submitted!');
      fetchGig();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply.');
    }
  };

  const handleApprove = async (applicantId) => {
    if (window.confirm('Are you sure you want to approve this applicant?')) {
      try {
        // Approve the gig on the backend
        await gigService.approveApplicant(gigId, applicantId);
        toast.success('Applicant approved!');

        // Find or create a conversation with the approved applicant
        const conversation = await chatService.findOrCreateConversation(applicantId);

        // Navigate to the chat page with the specific conversation open
        navigate('/chat', { state: { conversationId: conversation._id } });
      } catch (error) {
        toast.error('Failed to approve applicant or start chat.', error);
      }
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!gig) return <p className="text-center p-10">Gig not found.</p>;

  const isOwner = userInfo?._id === gig.requester?._id;
  const hasApplied = gig.applicants?.some(app => app._id === userInfo?._id);
  const isAssignee = gig.assignee?._id === userInfo?._id;

  // return (
  //   <div className="max-w-4xl mx-auto p-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
  //     <div className="bg-white p-8 rounded-3xl shadow-lg border-4 border-black">
  //       {/* Gig Details */}
  //       <div className="border-b-2 border-gray-200 pb-4 mb-4">
  //         <p className="text-sm font-bold text-gray-500">{gig.subject}</p>
  //         <h1 className="text-4xl font-bold text-[#6e48aa] mt-1">{gig.title}</h1>
  //         <p className="text-md text-gray-500 mt-2">
  //           Posted by <Link to={`/profile/${gig.requester._id}`} className="font-bold text-[#6e48aa] hover:underline">{gig.requester.name}</Link>
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-2 gap-4 my-6 text-center">
  //         <div>
  //           <p className="text-sm font-bold text-gray-500">BUDGET</p>
  //           <p className="text-2xl font-bold text-purple-600">Rs. {gig.budget}</p>
  //         </div>
  //         <div>
  //           <p className="text-sm font-bold text-gray-500">DEADLINE</p>
  //           <p className="text-xl font-bold text-red-500">{new Date(gig.deadline).toLocaleDateString()}</p>
  //         </div>
  //       </div>

  //       <h2 className="text-2xl font-bold text-[#6e48aa] mb-2">Description</h2>
  //       <p className="text-gray-700 whitespace-pre-wrap mb-6">{gig.description}</p>

  //       {gig.filePath && (
  //         <div className="mb-8">
  //           <a href={`${import.meta.env.VITE_BACKEND_URL}${gig.filePath}`} download className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-bold rounded-xl border-2 border-black">
  //             <FaDownload /> Download Details
  //           </a>
  //         </div>
  //       )}

  //       {/* Dynamic Action Section */}
  //       <div className="mt-8 pt-6 border-t-2 border-gray-200">
  //         {isOwner ? (
  //           <div>
  //             <h2 className="text-2xl font-bold text-[#6e48aa] mb-4">Applicants ({gig.applicants?.length || 0})</h2>
  //             {gig.applicants && gig.applicants.length > 0 ? (
  //               <div className="space-y-4">
  //                 {gig.applicants.map(applicant => (
  //                   <div key={applicant._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-black">
  //                     <Link to={`/profile/${applicant._id}`} className="flex items-center gap-3">
  //                       <img src={applicant.profilePicture} alt={applicant.name} className="w-10 h-10 rounded-full border-2 border-black" />

  //                       <span className="font-bold">{applicant.name}</span>
  //                     </Link>
  //                     {gig.status === 'Open' && (
  //                       <button onClick={() => handleApprove(applicant._id)} className="px-4 py-2 bg-purple-500 text-white font-bold rounded-xl border-2 border-black">Approve</button>
  //                     )}
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : <p className="text-gray-500">No applications yet.</p>}
  //           </div>
  //         ) : isAssignee ? (
  //           <div className="text-center p-4 bg-purple-100 rounded-xl border-2 border-purple-500">
  //             <p className="font-bold text-purple-700">You have been assigned this gig! Please contact the requester in your chat.</p>
  //           </div>
  //         ) : (
  //           <>
  //             {gig.status === 'Open' ? (
  //               hasApplied ? (
  //                 <p className="text-center font-bold text-gray-500">You have already applied for this gig.</p>
  //               ) : (
  //                 <button onClick={handleApply} className="w-full py-3 font-bold text-white bg-[#6e48aa] rounded-xl border-2 border-black hover:bg-[#5a3a8a]">APPLY NOW</button>
  //               )
  //             ) : (
  //               <p className="text-center font-bold text-red-500">This gig has been assigned to <Link to={`/profile/${gig.assignee?._id}`} className="underline">{gig.assignee?.name}</Link>.</p>
  //             )}
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  // No changes to imports and hooks — keep as-is

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-black hover:shadow-purple-300 transition-shadow duration-300">
        {/* Gig Header */}
        <div className="border-b-4 border-gray-200 pb-6 mb-6">
          <p className="text-xs uppercase font-bold text-gray-500 tracking-wide">{gig.subject}</p>
          <h1 className="text-4xl font-extrabold text-[#6e48aa] mt-1">{gig.title}</h1>
          <p className="text-md text-gray-600 mt-2">
            Posted by{' '}
            <Link
              to={`/profile/${gig.requester._id}`}
              className="font-bold text-[#6e48aa] hover:underline"
            >
              {gig.requester.name}
            </Link>
          </p>
        </div>

        {/* Budget & Deadline */}
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="p-4 bg-gray-100 rounded-xl border-2 border-black">
            <p className="text-xs font-bold text-gray-500 uppercase">Budget</p>
            <p className="text-2xl font-extrabold text-purple-600">Rs. {gig.budget}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl border-2 border-black">
            <p className="text-xs font-bold text-gray-500 uppercase">Deadline</p>
            <p className="text-xl font-bold text-red-500">{new Date(gig.deadline).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#6e48aa] mb-2">📜 Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{gig.description}</p>
        </div>

        {/* File Download */}
        {gig.filePath && (
          <div className="mt-6">
            <a
              href={`${import.meta.env.VITE_BACKEND_URL}${gig.filePath}`}
              download
              className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 transition text-white font-bold rounded-xl border-2 border-black"
            >
              <FaDownload /> Download Details
            </a>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 pt-8 border-t-4 border-gray-300">
          {isOwner ? (
            <div>
              <h2 className="text-2xl font-bold text-[#6e48aa] mb-4">👩‍💻 Applicants ({gig.applicants?.length || 0})</h2>
              {gig.applicants?.length > 0 ? (
                <div className="space-y-4">
                  {gig.applicants.map(applicant => (
                    <div
                      key={applicant._id}
                      className="flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl shadow-md hover:shadow-lg"
                    >
                      <Link to={`/profile/${applicant._id}`} className="flex items-center gap-3">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${applicant?.profilePicture}`}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full border-2 border-black"
                        />




                        <span className="font-bold text-[#6e48aa]">{applicant.name}</span>
                      </Link>
                      {gig.status === 'Open' && (
                        <button
                          onClick={() => handleApprove(applicant._id)}
                          className="px-4 py-2 bg-purple-500 cursor-pointer hover:bg-purple-600 transition text-white font-bold rounded-xl border-2 border-black"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No applications yet.</p>
              )}
            </div>
          ) : isAssignee ? (
            <div className="text-center p-6 bg-purple-100 rounded-xl border-2 border-purple-500 shadow-md">
              <p className="font-bold text-purple-700">
                ✅ You have been assigned this gig! Please contact the requester in your chat.
              </p>
            </div>
          ) : gig.status === 'Open' ? (
            hasApplied ? (
              <p className="text-center font-bold text-gray-500">You have already applied for this gig.</p>
            ) : (
              <button
                onClick={handleApply}
                className="w-full py-3 font-bold text-white bg-[#6e48aa] hover:bg-[#4e3480] transition rounded-xl border-2 border-black"
              >
                APPLY NOW
              </button>
            )
          ) : (
            <p className="text-center font-bold text-red-500">
              This gig has been assigned to{' '}
              <Link to={`/profile/${gig.assignee?._id}`} className="underline">
                {gig.assignee?.name}
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );

};

export default GigDetailPage;
