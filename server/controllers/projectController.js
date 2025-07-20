const Project = require('../models/Project.js');
const path = require('path');
const fs = require('fs');


const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            subject,
            projectType,
            price,
            githubLink,
            demoVideoUrl,
        } = req.body;

        // req.files will now be an object with properties for each field
        // e.g., req.files.projectFile and req.files.screenshots

        const screenshots = req.files.screenshots ? req.files.screenshots.map(file => `/uploads/${file.filename}`) : [];
        // const filePath = req.files.projectFile ? `/uploads/${req.files.projectFile[0].filename}` : '';
        const filePath = req.files.projectFile ? req.files.projectFile[0].filename : ''; // <-- Save only the filename

        if (!filePath && !githubLink) {
            return res.status(400).json({ message: 'You must provide either a project file or a GitHub link.' });
        }

        const project = new Project({
            user: req.user._id,
            title,
            description,
            subject,
            projectType,
            price,
            githubLink,
            demoVideoUrl,
            screenshots,
            filePath, // <-- Save the path to the main project file
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error: error.message });
    }
};
// const downloadProjectFile = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);

//         if (project && project.filePath) {
//             // For now, we only check if the user is logged in.
//             // Later, we'll add logic to check if they have purchased it.

//             const __dirname = path.resolve();
//             const filePath = path.join(__dirname, project.filePath);

//             // Use res.download() to trigger a file download
//             res.download(filePath, (err) => {
//                 if (err) {
//                     res.status(404).json({ message: 'File not found.' });
//                 }
//             });
//         } else {
//             res.status(404).json({ message: 'Project or file not found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
const downloadProjectFile = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project && project.filePath) {
            const absoluteFilePath = path.join(process.cwd(), 'uploads', project.filePath);

            // 2. Add a console log to see the exact path being used
            console.log('Attempting to download file from path:', absoluteFilePath);

            // 3. Check if the file exists before attempting to download
            if (fs.existsSync(absoluteFilePath)) {
                res.download(absoluteFilePath, (err) => {
                    if (err) {
                        // This will handle errors during the actual file transfer
                        console.error('Error during file download transfer:', err);
                        res.status(500).send({ message: "Could not download the file." });
                    }
                });
            } else {
                console.error('File not found at path:', absoluteFilePath);
                res.status(404).json({ message: 'File does not exist on server.' });
            }
        } else {
            res.status(404).json({ message: 'Project or file path not found.' });
        }
    } catch (error) {
        console.error('Server error in downloadProjectFile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            'user',
            'name profilePicture'
        );
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('user', 'name rating numReviews');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Check if the logged-in user is the owner of the project
            if (project.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            // Update the fields
            project.title = req.body.title || project.title;
            project.description = req.body.description || project.description;
            project.subject = req.body.subject || project.subject;
            project.price = req.body.price ?? project.price; // Use ?? to allow setting price to 0

            const updatedProject = await project.save();
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Check if the logged-in user is the owner
            if (project.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await project.deleteOne();
            res.status(200).json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = { createProject, getProjectById, getProjects, updateProject, deleteProject, downloadProjectFile };