

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import projectService from '../services/projectService';
// import { toast } from 'react-hot-toast';

// const EditProjectPage = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         subject: '',
//         price: 0,
//         projectType: 'Other',
//         githubLink: '',
//         demoVideoUrl: '',
//     });
//     const [loading, setLoading] = useState(true);

//     const { id: projectId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 const data = await projectService.getProjectById(projectId);
//                 setFormData({
//                     title: data.title,
//                     description: data.description,
//                     subject: data.subject,
//                     price: data.price,
//                     projectType: data.projectType,
//                     githubLink: data.githubLink || '',
//                     demoVideoUrl: data.demoVideoUrl || '',
//                 });
//             } catch (error) {
//                 toast.error('Could not fetch project data.');
//                 console.log(error)

//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProject();
//     }, [projectId]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await projectService.updateProject(projectId, formData);
//             toast.success('Project updated successfully!');
//             navigate(`/projects/${projectId}`);
//         } catch (error) {
//             toast.error('Failed to update project.');
//             console.log(error);

//         }
//     };

//     const handleDelete = async () => {
//         if (window.confirm('Are you sure you want to delete this project?')) {
//             try {
//                 await projectService.deleteProject(projectId);
//                 toast.success('Project deleted!');
//                 navigate('/projects');
//             } catch (error) {
//                 toast.error('Failed to delete project.');
//                 console.log(error)
//             }
//         }
//     };

//     if (loading) return <p className="text-center font-bold text-xl">Loading...</p>;

//     return (
//         <div className="flex justify-center items-center min-h-screen   p-4">
//             <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-purple-700">
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold text-[#6e48aa] mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
//                         Edit Project Listing
//                     </h1>
//                     <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto"></div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* All Inputs */}
//                     <input id="title" type="text" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//                     <input id="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//                     <textarea id="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//                     <input id="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
//                     <input id="githubLink" type="url" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />

//                     {/* Save Changes Button */}
//                     <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#48aae6] rounded-xl hover:bg-[#3a8cc4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48aae6] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
//                         SAVE CHANGES
//                     </button>
//                 </form>

//                 {/* Delete Button Section */}
//                 <div className="mt-6 border-t-2 border-gray-200 pt-6">
//                     <button onClick={handleDelete} className="w-full px-4 py-3 font-bold text-white bg-[#ff4757] rounded-xl hover:bg-[#e03f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4757] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
//                         DELETE PROJECT
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProjectPage;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import { toast } from 'react-hot-toast';
import { FaSave, FaTrashAlt, FaArrowLeft, FaGithub, FaYoutube } from 'react-icons/fa';
import { FiDollarSign, FiBookOpen, FiType } from 'react-icons/fi';

const EditProjectPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        price: 0,
        projectType: 'Other',
        githubLink: '',
        demoVideoUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { id: projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectService.getProjectById(projectId);
                setFormData({
                    title: data.title,
                    description: data.description,
                    subject: data.subject,
                    price: data.price,
                    projectType: data.projectType,
                    githubLink: data.githubLink || '',
                    demoVideoUrl: data.demoVideoUrl || '',
                });
            } catch (error) {
                toast.error('Could not fetch project data.');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await projectService.updateProject(projectId, formData);
            toast.success('Project updated successfully!');
            navigate(`/projects/${projectId}`);
        } catch (error) {
            toast.error('Failed to update project.');
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                await projectService.deleteProject(projectId);
                toast.success('Project deleted!');
                navigate('/projects');
            } catch (error) {
                toast.error('Failed to delete project.');
                console.log(error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 mb-6 transition-colors"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                    <FaArrowLeft /> Back to Project
                </button>

                <div className="bg-white rounded-2xl   border border-3 border-purple-700">
                    {/* Header */}
                    <div className="bg-purple-to-r from-purple-600 to-blue-500 p-6 text-white">
                        <h1
                            className="text-3xl text-purple-700 font-bold text-center"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        >
                            Edit Project Details
                        </h1>
                        <div className="w-24 h-1 bg-white rounded-full mx-auto mt-3"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="flex items-center gap-2 text-purple-800 font-bold">
                                <FiType /> Project Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <label htmlFor="subject" className="flex items-center gap-2 text-purple-800 font-bold">
                                <FiBookOpen /> Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="flex items-center gap-2 text-purple-800 font-bold">
                                Project Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label htmlFor="price" className="flex items-center gap-2 text-purple-800 font-bold">
                                <FiDollarSign /> Price (Rs)
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                        </div>

                        {/* GitHub Link */}
                        <div className="space-y-2">
                            <label htmlFor="githubLink" className="flex items-center gap-2 text-purple-800 font-bold">
                                <FaGithub /> GitHub Repository
                            </label>
                            <input
                                id="githubLink"
                                type="url"
                                value={formData.githubLink}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        {/* Demo Video URL */}
                        <div className="space-y-2">
                            <label htmlFor="demoVideoUrl" className="flex items-center gap-2 text-purple-800 font-bold">
                                <FaYoutube /> Demo Video URL
                            </label>
                            <input
                                id="demoVideoUrl"
                                type="url"
                                value={formData.demoVideoUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                placeholder="https://youtube.com/your-video"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold disabled:opacity-70"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            >
                                <FaSave /> {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            >
                                <FaTrashAlt /> Delete Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProjectPage;
