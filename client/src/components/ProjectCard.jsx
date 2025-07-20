// // import React from 'react';
// // import { Link } from 'react-router-dom'; // <-- Import Link

// // const ProjectCard = ({ project }) => {
// //     return (
// //         <Link to={`/projects/${project._id}`} className="block"> {/* <-- Wrap everything in a Link */}
// //             <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
// //                 <div className="p-6">
// //                     <p className="text-sm text-blue-500 font-semibold">{project.subject}</p>
// //                     <h3 className="text-xl font-bold mt-2 truncate">{project.title}</h3>
// //                     <p className="text-gray-600 mt-2 h-12 overflow-hidden">{project.description}</p>
// //                     <div className="mt-4 flex justify-between items-center">
// //                         <p className="text-lg font-semibold text-gray-800">
// //                             {project.price === 0 ? 'Free' : `Rs. ${project.price}`}
// //                         </p>
// //                         <p className="text-sm text-gray-500">by {project.user?.name || 'Unknown'}</p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </Link>
// //     );
// // };

// // export default ProjectCard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import StarRating from './StarRating';

// const ProjectCard = ({ project }) => {
//     return (
//         <Link to={`/projects/${project._id}`} className="block">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 border-black hover:border-[#6e48aa] hover:scale-[1.02]">
//                 <div className="p-6">
//                     <p
//                         className="text-sm text-[#48aae6] font-bold uppercase tracking-wider"
//                         style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                     >
//                         {project.subject}
//                     </p>
//                     <h3
//                         className="text-xl font-bold mt-2 truncate text-[#6e48aa]"
//                         style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
//                     >
//                         {project.title}
//                     </h3>
//                     <p
//                         className="text-gray-600 mt-2 h-12 overflow-hidden"
//                         style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                     >
//                         {project.description}
//                     </p>
//                     <div className="mt-4 flex justify-between items-center">
//                         <p
//                             className="text-lg font-bold text-gray-800"
//                             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                         >
//                             {project.price === 0 ? 'FREE!' : `Rs. ${project.price}`}
//                         </p>
//                         <p
//                             className="text-sm text-gray-500"
//                             style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
//                         >
//                             by {project.user?.name || 'Unknown'}
//                         </p>
//                         <StarRating rating={project.user.rating} numReviews={project.user.numReviews} />

//                     </div>
//                 </div>
//                 <div className="w-full h-2 bg-[#48aae6]"></div>
//             </div>
//         </Link>
//     );
// };

// export default ProjectCard;

import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { FaGraduationCap, FaUser, FaRupeeSign, FaGift } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project._id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border-4 border-purple-100 hover:border-purple-300 group-hover:scale-[1.02] relative">
                {/* Subject Ribbon */}
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider transform translate-x-2 -translate-y-2 rotate-12 shadow-md">
                    {project.subject}
                </div>

                {/* Main Content */}
                <div className="p-6 pt-8">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-purple-900 mb-3 group-hover:text-purple-700 transition-colors"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                        {project.title}
                    </h3>

                    {/* Description */}
                    <div className="min-h-[4rem] mb-4">
                        <p className="text-gray-600 line-clamp-3"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            {project.description}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[2px] bg-gradient-to-r from-purple-100 to-purple-300 my-4"></div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Price */}
                        <div className="flex items-center gap-2">
                            {project.price === 0 ? (
                                <>
                                    <FaGift className="text-green-500 text-xl" />
                                    <span className="text-lg font-bold text-green-600"
                                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                        FREE!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-purple-600 font-bold"> Rs.</span>

                                    <span className="text-lg font-bold text-purple-900"
                                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                        {project.price}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Author & Rating */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-purple-400" />
                                <span className="text-sm text-gray-600"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                    {project.user?.name || 'Unknown'}
                                </span>
                            </div>
                            <StarRating
                                rating={project.user?.rating || 0}
                                numReviews={project.user?.numReviews || 0}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-600"></div>
            </div>
        </Link>
    );
};

export default ProjectCard;