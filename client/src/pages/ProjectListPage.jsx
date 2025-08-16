

import { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaSpinner } from 'react-icons/fa';

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getProjects();
                setProjects(data);
            } catch (error) {
                toast.error('Could not fetch projects');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-purple-50 to-indigo-100">
                <FaSpinner className="animate-spin text-4xl text-purple-600 mb-4" />
                <p
                    className="text-2xl text-purple-800"
                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                >
                    Loading Projects...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h1
                    className="text-4xl md:text-5xl font-bold text-purple-600 mb-6"
                    style={{
                        fontFamily: "'Comic Sans MS', cursive, sans-serif",
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        background: 'linear-gradient(to right, #6e48aa, #48aae6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Project Marketplace
                </h1>

                {/* Search and Create Container */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-purple-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects by title, subject or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-3 border-0 rounded-xl shadow-md text-purple-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>

                    {/* Create Button */}
                    <Link
                        to="/projects/create"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                        style={{
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            minWidth: '200px'
                        }}
                    >
                        <FaPlus /> CREATE PROJECT
                    </Link>
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
                    <h2
                        className="text-2xl font-bold text-purple-800 mb-4"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                        {searchTerm ? 'No matching projects found' : 'No projects available yet'}
                    </h2>
                    <p
                        className="text-gray-600 mb-6"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                        {searchTerm ? 'Try a different search term' : 'Be the first to create one!'}
                    </p>
                    <Link
                        to="/projects/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                    >
                        <FaPlus /> CREATE FIRST PROJECT
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProjectListPage;