


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import projectService from '../services/projectService';
// import { toast } from 'react-hot-toast';

// const CreateProjectPage = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         subject: '',
//         price: '',
//         projectType: 'Other',
//         githubLink: '',
//         demoVideoUrl: '',
//     });
//     const [screenshots, setScreenshots] = useState(null);
//     const [projectFile, setProjectFile] = useState(null); // <-- 1. Add state for the main project file

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();

//         // Append all text fields
//         for (const key in formData) {
//             data.append(key, formData[key]);
//         }

//         // 4. Append the main project file if it exists
//         if (projectFile) {
//             data.append('projectFile', projectFile);
//         }

//         // Append screenshot files if they exist
//         if (screenshots) {
//             for (let i = 0; i < screenshots.length; i++) {
//                 data.append('screenshots', screenshots[i]);
//             }
//         }

//         try {
//             await projectService.createProject(data);
//             toast.success('Project created successfully!');
//             navigate('/projects');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to create project.');
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto font-sans">
//             <h1 className="text-3xl font-extrabold text-center mb-8">List a New Project</h1>
//             <div className="bg-white border-2 border-duo-light-gray rounded-2xl p-8 shadow-lg">
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* ... Title, Subject, Description, Type, Price, Links inputs ... */}
//                     <input id="title" type="text" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
//                     <input id="subject" type="text" placeholder="Subject (e.g., Computer Science)" value={formData.subject} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
//                     <textarea id="description" placeholder="Detailed Description" value={formData.description} onChange={handleChange} required rows="5" className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
//                     <div>
//                         <label htmlFor="projectType" className="block text-md font-bold text-gray-700 mb-2">Project Type</label>
//                         <select id="projectType" value={formData.projectType} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray bg-white">
//                             <option>Other</option>
//                             <option>Code</option>
//                             <option>Essay</option>
//                             <option>Research Paper</option>
//                             <option>Presentation</option>
//                         </select>
//                     </div>
//                     <input id="price" type="number" placeholder="Price (Rs.)" value={formData.price} onChange={handleChange} required className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
//                     <input id="githubLink" type="url" placeholder="GitHub Link (Optional)" value={formData.githubLink} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />
//                     <input id="demoVideoUrl" type="url" placeholder="Demo Video URL (Optional)" value={formData.demoVideoUrl} onChange={handleChange} className="w-full text-lg px-4 py-3 border-2 border-duo-light-gray rounded-2xl focus:outline-none focus:border-duo-gray" />

//                     {/* 2. Add the input for the main project file */}
//                     <div>
//                         <label htmlFor="projectFile" className="block text-md font-bold text-gray-700 mb-2">Main Project File (PDF, DOCX, etc.)</label>
//                         <input
//                             id="projectFile"
//                             name="projectFile" // <-- Add name attribute
//                             type="file"
//                             onChange={(e) => setProjectFile(e.target.files[0])}
//                             className="w-full text-duo-gray file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-duo-blue file:text-sm file:font-bold file:bg-blue-50 file:text-duo-blue hover:file:bg-blue-100"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="screenshots" className="block text-md font-bold text-gray-700 mb-2">Screenshots (Optional)</label>
//                         <input
//                             id="screenshots"
//                             name="screenshots"
//                             type="file"
//                             onChange={(e) => setScreenshots(e.target.files)}
//                             multiple
//                             className="w-full text-duo-gray file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-duo-purple file:text-sm file:font-bold file:bg-duo-purple/20 file:text-duo-purple-dark hover:file:bg-duo-purple/30"
//                         />
//                     </div>

//                     <button type="submit" className="w-full text-lg font-bold text-white bg-purple-500 rounded-2xl p-3 uppercase border-b-4 border-duo-purple-dark hover:bg-purple-500 active:border-b-2">
//                         List Project
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateProjectPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX, FiImage, FiFile } from 'react-icons/fi';

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
    const [screenshots, setScreenshots] = useState([]);
    const [projectFile, setProjectFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e, setFiles, multiple = false) => {
        e.preventDefault();
        setIsDragging(false);
        const files = multiple ? Array.from(e.dataTransfer.files) : e.dataTransfer.files[0];
        handleFiles(files, setFiles, multiple);
    };

    const handleFileSelect = (e, setFiles, multiple = false) => {
        const files = multiple ? Array.from(e.target.files) : e.target.files[0];
        handleFiles(files, setFiles, multiple);
    };

    const handleFiles = (files, setFiles, multiple) => {
        if (multiple) {
            setFiles(prev => [...prev, ...files]);
        } else {
            setFiles(files);
        }
    };

    const removeScreenshot = (index) => {
        setScreenshots(prev => prev.filter((_, i) => i !== index));
    };

    const removeProjectFile = () => {
        setProjectFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }

        if (projectFile) {
            data.append('projectFile', projectFile);
        }

        if (screenshots.length > 0) {
            screenshots.forEach(file => data.append('screenshots', file));
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
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-purple-700 mb-2">Create Your Project</h1>
                <p className="text-gray-600">Share your amazing work with the community</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Info Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Project Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="e.g. E-commerce Website"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="e.g. Computer Science"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                            <textarea
                                id="description"
                                placeholder="Describe your project in detail..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                                <select
                                    id="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option>Other</option>
                                    <option>Code</option>
                                    <option>Essay</option>
                                    <option>Research Paper</option>
                                    <option>Presentation</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)*</label>
                                <input
                                    id="price"
                                    type="number"
                                    placeholder="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                                <input
                                    id="githubLink"
                                    type="url"
                                    placeholder="https://github.com/your-project"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="demoVideoUrl" className="block text-sm font-medium text-gray-700 mb-1">Demo Video URL</label>
                                <input
                                    id="demoVideoUrl"
                                    type="url"
                                    placeholder="https://youtube.com/your-demo"
                                    value={formData.demoVideoUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project File Upload */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Project File*</h2>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, setProjectFile)}
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
                        >
                            {projectFile ? (
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <FiFile className="text-gray-500 mr-3" size={24} />
                                        <div>
                                            <p className="font-medium text-gray-800">{projectFile.name}</p>
                                            <p className="text-sm text-gray-500">{(projectFile.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeProjectFile}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <FiUpload className="mx-auto text-gray-400" size={48} />
                                    <p className="mt-3 text-gray-600">Drag & drop your project file here</p>
                                    <p className="text-sm text-gray-500 mb-4">or</p>
                                    <label className="cursor-pointer inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        Browse Files
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileSelect(e, setProjectFile)}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="mt-2 text-xs text-gray-500">Supports PDF, DOCX, PPT, ZIP (Max 20MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Screenshots Upload */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Screenshots</h2>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, setScreenshots, true)}
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
                        >
                            {screenshots.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {screenshots.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeScreenshot(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FiX size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                        <FiUpload className="mr-2" />
                                        Add More
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleFileSelect(e, setScreenshots, true)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            ) : (
                                <>
                                    <FiImage className="mx-auto text-gray-400" size={48} />
                                    <p className="mt-3 text-gray-600">Drag & drop screenshots here</p>
                                    <p className="text-sm text-gray-500 mb-4">or</p>
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        <FiUpload className="mr-2" />
                                        Browse Images
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleFileSelect(e, setScreenshots, true)}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="mt-2 text-xs text-gray-500">Supports JPG, PNG (Max 5MB each)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                        >
                            Publish Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectPage;