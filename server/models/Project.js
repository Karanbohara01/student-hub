const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        subject: {
            type: String,
            required: [true, 'Please add a subject'],
        },
        projectType: {
            type: String,
            enum: ['Essay', 'Research Paper', 'Presentation', 'Code', 'Other'],
            default: 'Other',
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        isFree: {
            type: Boolean,
            default: function () {
                return this.price === 0;
            },
        },
         
        filePath: {
            type: String,  
        },
        githubLink: {
            type: String,  
            trim: true,
        },
        demoVideoUrl: {
            type: String,  
            trim: true,
        },
        screenshots: [
            { type: String } 
        ]
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;