


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import { toast } from 'react-hot-toast';

const CreateProjectPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        price: '',
        projectType: 'Other',
        githubLink: '',
        demoVideoUrl: '',
    });
    const [screenshots, setScreenshots] = useState(null);
    const [projectFile, setProjectFile] = useState(null); // <-- 1. Add state for the main project file

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append all text fields
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        // 4. Append the main project file if it exists
        if (projectFile) {
            data.append('projectFile', projectFile);
        }

        // Append screenshot files if they exist
        if (screenshots) {
            for (let i = 0; i < screenshots.length; i++) {
                data.append('screenshots', screenshots[i]);
            }
        }

        try {
            await projectService.createProject(data);
            toast.success('Project created successfully!');
            navigate('/projects');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create project.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto font-sans">
            <h1 className="text-3xl font-extrabold text-center mb-8">List a New Project</h1>
            <div className="bg-white border-2 border-duo-light-gray rounded-2xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ... Title, Subject, Description, Type, Price, Links inputs ... */}
                    <input id="title" type="text" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
                    <input id="subject" type="text" placeholder="Subject (e.g., Computer Science)" value={formData.subject} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
                    <textarea id="description" placeholder="Detailed Description" value={formData.description} onChange={handleChange} required rows="5" className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
                    <div>
                        <label htmlFor="projectType" className="block text-md font-bold text-gray-700 mb-2">Project Type</label>
                        <select id="projectType" value={formData.projectType} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray bg-white">
                            <option>Other</option>
                            <option>Code</option>
                            <option>Essay</option>
                            <option>Research Paper</option>
                            <option>Presentation</option>
                        </select>
                    </div>
                    <input id="price" type="number" placeholder="Price (Rs.)" value={formData.price} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
                    <input id="githubLink" type="url" placeholder="GitHub Link (Optional)" value={formData.githubLink} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
                    <input id="demoVideoUrl" type="url" placeholder="Demo Video URL (Optional)" value={formData.demoVideoUrl} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />

                    {/* 2. Add the input for the main project file */}
                    <div>
                        <label htmlFor="projectFile" className="block text-md font-bold text-gray-700 mb-2">Main Project File (PDF, DOCX, etc.)</label>
                        <input
                            id="projectFile"
                            name="projectFile" // <-- Add name attribute
                            type="file"
                            onChange={(e) => setProjectFile(e.target.files[0])}
                            className="w-full text-duo-gray file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-duo-blue file:text-sm file:font-bold file:bg-blue-50 file:text-duo-blue hover:file:bg-blue-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="screenshots" className="block text-md font-bold text-gray-700 mb-2">Screenshots (Optional)</label>
                        <input
                            id="screenshots"
                            name="screenshots"
                            type="file"
                            onChange={(e) => setScreenshots(e.target.files)}
                            multiple
                            className="w-full text-duo-gray file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-duo-purple file:text-sm file:font-bold file:bg-duo-purple/20 file:text-duo-purple-dark hover:file:bg-duo-purple/30"
                        />
                    </div>

                    <button type="submit" className="w-full text-lg font-bold text-white bg-purple-500 rounded-2xl p-3 uppercase border-b-4 border-duo-purple-dark hover:bg-purple-500 active:border-b-2">
                        List Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectPage;