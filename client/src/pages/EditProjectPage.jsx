// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import projectService from '../services/projectService';
// import { toast } from 'react-hot-toast';

// const EditProjectPage = () => {
//     const [project, setProject] = useState(null);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);

//     const { id: projectId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 const data = await projectService.getProjectById(projectId);
//                 setProject(data);
//                 setTitle(data.title);
//                 setDescription(data.description);
//                 setPrice(data.price);
//             } catch (error) {
//                 toast.error('Could not fetch project data.');
//                 console.log(error);

//             }
//         };
//         fetchProject();
//     }, [projectId]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { title, description, price };
//             await projectService.updateProject(projectId, updatedData);
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
//                 toast.success('Project deleted successfully!');
//                 navigate('/projects');
//             } catch (error) {
//                 toast.error('Failed to delete project.');
//                 console.log(error);

//             }
//         }
//     };

//     if (!project) return <p>Loading...</p>;

//     return (
//         <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-6">Edit Project Listing</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                     <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full mt-1 input-style" />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                     <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full mt-1 input-style" />
//                 </div>
//                 <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (Rs.)</label>
//                     <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full mt-1 input-style" />
//                 </div>
//                 <div className="flex space-x-4">
//                     <button type="submit" className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Save Changes</button>
//                     <button type="button" onClick={handleDelete} className="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Delete Project</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default EditProjectPage;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import { toast } from 'react-hot-toast';

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
                console.log(error)

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
        try {
            await projectService.updateProject(projectId, formData);
            toast.success('Project updated successfully!');
            navigate(`/projects/${projectId}`);
        } catch (error) {
            toast.error('Failed to update project.');
            console.log(error);

        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(projectId);
                toast.success('Project deleted!');
                navigate('/projects');
            } catch (error) {
                toast.error('Failed to delete project.');
                console.log(error)
            }
        }
    };

    if (loading) return <p className="text-center font-bold text-xl">Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#6e48aa] mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                        Edit Project Listing
                    </h1>
                    <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* All Inputs */}
                    <input id="title" type="text" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
                    <input id="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
                    <textarea id="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
                    <input id="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />
                    <input id="githubLink" type="url" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }} />

                    {/* Save Changes Button */}
                    <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-[#48aae6] rounded-xl hover:bg-[#3a8cc4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48aae6] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                        SAVE CHANGES
                    </button>
                </form>

                {/* Delete Button Section */}
                <div className="mt-6 border-t-2 border-gray-200 pt-6">
                    <button onClick={handleDelete} className="w-full px-4 py-3 font-bold text-white bg-[#ff4757] rounded-xl hover:bg-[#e03f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4757] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}>
                        DELETE PROJECT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProjectPage;
