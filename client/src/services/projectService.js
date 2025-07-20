import axios from 'axios';

const API_URL = '/api/projects';

// Fetch all projects
const getProjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
const getProjectById = async (projectId) => {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
};
const createProject = async (projectData) => {
    // projectData will be FormData because it includes files
    const response = await axios.post(API_URL, projectData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
const updateProject = async (projectId, projectData) => {
    const response = await axios.put(`${API_URL}/${projectId}`, projectData);
    return response.data;
};

const deleteProject = async (projectId) => {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data;
};

const projectService = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject

};

export default projectService;