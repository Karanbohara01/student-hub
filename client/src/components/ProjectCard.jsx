

import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { FaUser, FaGift } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project._id}`} className="block group transform transition-transform duration-300 hover:scale-[1.02]">
            <div className="bg-white rounded-2xl shadow-xl border-4 border-purple-200 group-hover:border-purple-400 transition-all duration-300 overflow-hidden relative"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >

                {/* Subject Label */}
                <div className="absolute  top-1 right-2 bg-purple-500 text-white text-xs px-3 py-1 rounded-md shadow-lg tracking-wide uppercase font-bold">
                    {project.subject}
                </div>

                {/* Card Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-purple-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Price */}
                    <div className="text-md font-bold text-purple-700 mb-4">
                        {project.price === 0 ? (
                            <span className="flex items-center gap-2 text-purple-600">
                                <FaGift className="text-base" /> FREE
                            </span>
                        ) : (
                            `Rs. ${project.price}`
                        )}
                    </div>

                    {/* Author & Rating */}
                    <div className="flex justify-between items-center text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-base" />
                            <span className="font-semibold">{project.user?.name || 'Unknown'}</span>
                        </div>
                        <StarRating
                            rating={project.user?.rating || 0}
                            numReviews={project.user?.numReviews || 0}
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
