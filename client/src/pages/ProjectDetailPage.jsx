
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectService from '../services/projectService';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import { FaGithub, FaImage, FaEdit, FaYoutube, FaDownload } from 'react-icons/fa';
import LeaveReview from '../components/LeaveReview'; // <-- Import the new component

const PlaceholderImage = () => (
    <div className="w-full h-64 bg-[#6e48aa] bg-opacity-10 rounded-xl border-2 border-dashed border-[#6e48aa] flex flex-col items-center justify-center text-[#6e48aa]">
        <FaImage className="text-5xl mb-4" />
        <p style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>No screenshot available</p>
    </div>
);

const ProjectDetailPage = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPurchased, setIsPurchased] = useState(false);
    const { userInfo } = useAuthStore();
    const { id: projectId } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectService.getProjectById(projectId);
                setProject(data);
            } catch (error) {
                toast.error('Could not fetch project details');
                console.log(error);

            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleBuy = () => {
        toast.success('Thank you for your purchase!');
        setIsPurchased(true);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-2xl text-[#6e48aa] animate-pulse" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                Loading project...
            </p>
        </div>
    );

    if (!project) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-2xl text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                Project not found!
            </p>
        </div>
    );

    const isOwner = userInfo?._id === project.user?._id;



    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                    {project.title}
                </h1>
                {isOwner && (
                    <Link to={`/projects/${project._id}/edit`} className="px-6 py-2 bg-[#48aae6] text-white font-bold rounded-xl hover:bg-[#3a8cc4] focus:outline-none transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                        <span className="flex items-center"><FaEdit className="mr-2" /> EDIT</span>
                    </Link>
                )}
            </div>
            {/* <p className="text-lg text-gray-500 mb-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                by {project.user?.name || 'Unknown'}
            </p> */}
            <p className="text-lg text-gray-600 mb-6 flex items-center gap-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                <span className="italic">Crafted by</span>
                <Link
                    to={`/profile/${project.user._id}`}
                    className="font-bold text-[#6e48aa] hover:underline hover:text-[#4a2d80] transition-colors duration-200"
                >
                    {project.user?.name || 'Unknown'}
                </Link>
                <span className="text-sm">✨</span>
            </p>


            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b-2 border-gray-200">
                    <div>
                        <p className="text-sm font-bold text-gray-500">PRICE</p>
                        <p className="text-xl font-bold text-[#6e48aa]">{project.price === 0 ? 'FREE' : `Rs. ${project.price}`}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500">SUBJECT</p>
                        <p className="text-xl font-bold text-[#6e48aa]">{project.subject}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500">TYPE</p>
                        <p className="text-xl font-bold text-[#6e48aa]">{project.projectType}</p>
                    </div>
                </div>

                <div className="flex space-x-4 mb-8">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-2 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                            <FaGithub className="mr-2" /> GITHUB
                        </a>
                    )}
                    {project.demoVideoUrl && (
                        <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-2 bg-[#ff4757] text-white font-bold rounded-xl hover:bg-[#e03f4f] transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                            <FaYoutube className="mr-2" /> DEMO
                        </a>
                    )}

                    {/* Conditional Download/Buy Button */}
                    {(isOwner || isPurchased) && project.filePath && (
                        // This now points to your secure API download route
                        <a href={`${import.meta.env.VITE_BACKEND_URL}/api/projects/${project._id}/download`} className="flex items-center px-6 py-2 bg-[#58cc02] text-white font-bold rounded-xl hover:bg-[#46a302] transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                            <FaDownload className="mr-2" /> DOWNLOAD FILE
                        </a>
                    )}

                    {!isOwner && !isPurchased && project.price > 0 && (
                        <button onClick={handleBuy} className="px-6 py-2 bg-[#58cc02] text-white font-bold rounded-xl hover:bg-[#46a302] transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                            BUY NOW
                        </button>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-[#6e48aa] mb-4 border-t-2 border-gray-200 pt-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>DESCRIPTION</h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-8" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{project.description}</p>

                <h3 className="text-2xl font-bold text-[#6e48aa] mb-4 border-t-2 border-gray-200 pt-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>SCREENSHOTS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.screenshots && project.screenshots.length > 0 ? (
                        project.screenshots.map((ss, index) => (
                            <img key={index} src={`${import.meta.env.VITE_BACKEND_URL}${ss}`} alt={`Screenshot ${index + 1}`} className="rounded-xl shadow-lg border-2 border-black w-full h-auto object-cover" />
                        ))
                    ) : (
                        <PlaceholderImage />
                    )}

                    {isPurchased && userInfo && (
                        <LeaveReview
                            targetId={project.user._id} // Pass the seller's ID as targetId
                            reviewType="seller"         // Tell the component this is a seller review
                            onReviewSubmitted={() => setIsPurchased(false)}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;