


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectService from "../services/projectService";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { FaGithub, FaImage, FaEdit, FaYoutube, FaDownload } from "react-icons/fa";
import LeaveReview from "../components/LeaveReview";

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
                toast.error("Could not fetch project details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleBuy = () => {
        toast.success("Thank you for your purchase!");
        setIsPurchased(true);
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-2xl text-[#6e48aa] animate-pulse" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    Loading project...
                </p>
            </div>
        );

    if (!project)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-2xl text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    Project not found!
                </p>
            </div>
        );

    const isOwner = userInfo?._id === project.user?._id;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <h1
                    className="text-4xl font-bold text-[#6e48aa] leading-tight"
                    style={{
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                        textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                    }}
                >
                    {project.title}
                </h1>
                {isOwner && (
                    <Link
                        to={`/projects/${project._id}/edit`}
                        className="px-6 py-2 bg-purple-800 text-white font-bold rounded-xl hover:bg-purple-500 transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-purple-700"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                        <FaEdit className="inline mr-2" /> EDIT
                    </Link>
                )}
            </div>

            {/* Author */}
            <p
                className="text-lg text-gray-600 mb-6 flex items-center gap-2"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
                <span className="italic">Crafted by</span>
                <Link
                    to={`/profile/${project.user._id}`}
                    className="font-bold text-[#6e48aa] hover:underline hover:text-[#4a2d80] transition-colors duration-200"
                >
                    {project.user?.name || "Unknown"}
                </Link>
                <span className="text-sm">✨</span>
            </p>

            {/* Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    <InfoBox label="PRICE" value={project.price === 0 ? "FREE" : `Rs. ${project.price}`} />
                    <InfoBox label="SUBJECT" value={project.subject} />
                    <InfoBox label="TYPE" value={project.projectType} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {project.githubLink && (
                        <ActionButton color="bg-gray-800 hover:bg-gray-900" icon={<FaGithub />} text="GITHUB" link={project.githubLink} />
                    )}
                    {project.demoVideoUrl && (
                        <ActionButton color="bg-[#ff4757] hover:bg-[#e03f4f]" icon={<FaYoutube />} text="DEMO" link={project.demoVideoUrl} />
                    )}
                    {(isOwner || isPurchased) && project.filePath && (
                        <ActionButton
                            color="bg-[#58cc02] hover:bg-[#46a302]"
                            icon={<FaDownload />}
                            text="DOWNLOAD FILE"
                            link={`${import.meta.env.VITE_BACKEND_URL}/api/projects/${project._id}/download`}
                        />
                    )}
                    {!isOwner && !isPurchased && project.price > 0 && (
                        <button
                            onClick={handleBuy}
                            className="px-6 py-2 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black w-full sm:w-auto"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        >
                            BUY NOW
                        </button>
                    )}
                </div>

                {/* Description */}
                <SectionTitle title="DESCRIPTION" />
                <p className="text-gray-700 whitespace-pre-wrap mb-8" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    {project.description}
                </p>

                {/* Screenshots */}
                <SectionTitle title="SCREENSHOTS" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.screenshots && project.screenshots.length > 0
                        ? project.screenshots.map((ss, index) => (
                            <img
                                key={index}
                                src={`${import.meta.env.VITE_BACKEND_URL}${ss}`}
                                alt={`Screenshot ${index + 1}`}
                                className="rounded-xl shadow-lg border-2 border-black w-full h-auto object-cover"
                            />
                        ))
                        : <PlaceholderImage />}
                </div>

                {isPurchased && userInfo && (
                    <LeaveReview
                        targetId={project.user._id}
                        reviewType="seller"
                        onReviewSubmitted={() => setIsPurchased(false)}
                    />
                )}
            </div>
        </div>
    );
};

// Reusable Components
const InfoBox = ({ label, value }) => (
    <div>
        <p className="text-sm font-bold text-gray-500">{label}</p>
        <p className="text-xl font-bold text-[#6e48aa]">{value}</p>
    </div>
);

const ActionButton = ({ color, icon, text, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center px-6 py-2 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md border-2 border-black ${color} w-full sm:w-auto`}
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
        <span className="mr-2">{icon}</span> {text}
    </a>
);

const SectionTitle = ({ title }) => (
    <h2
        className="text-2xl font-bold text-[#6e48aa] mb-4 border-t-2 border-gray-200 pt-6"
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
        {title}
    </h2>
);

export default ProjectDetailPage;
