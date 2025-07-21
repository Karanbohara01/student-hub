const Gig = require('../models/Gig.js');



const createGig = async (req, res) => {
    try {
        const { title, subject, budget, deadline, description } = req.body;

        const gig = new Gig({
            requester: req.user._id,
            title,
            subject,
            budget,
            deadline,
            description,
            filePath: req.file ? `/uploads/${req.file.filename}` : undefined, // <-- Add this
        });

        const createdGig = await gig.save();
        res.status(201).json(createdGig);
    } catch (error) {
        res.status(400).json({ message: 'Error creating gig', error: error.message });
    }
};

const getGigs = async (req, res) => {
    try {
        // Find only gigs with the status 'Open'
        const gigs = await Gig.find({ status: 'Open' })
            .populate('requester', 'name university')
            .sort({ createdAt: -1 });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const getGigById = async (req, res) => {
    try {

        const gig = await Gig.findById(req.params.id)
            .populate('requester', 'name profilePicture')
            .populate('assignee', 'name profilePicture')
            .populate('applicants', 'name profilePicture');


        if (gig) {
            res.status(200).json(gig);
        } else {
            res.status(404).json({ message: 'Gig not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            if (gig.requester.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            gig.title = req.body.title || gig.title;
            gig.description = req.body.description || gig.description;
            gig.budget = req.body.budget || gig.budget;
            gig.deadline = req.body.deadline || gig.deadline;

            const updatedGig = await gig.save();
            res.status(200).json(updatedGig);
        } else {
            res.status(404).json({ message: 'Gig not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            if (gig.requester.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await gig.deleteOne();
            res.status(200).json({ message: 'Gig removed' });
        } else {
            res.status(404).json({ message: 'Gig not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// const applyForGig = async (req, res) => {
//     try {
//         const gig = await Gig.findById(req.params.id);

//         if (gig) {
//             if (gig.requester.toString() === req.user._id.toString()) {
//                 return res.status(400).json({ message: 'You cannot apply for your own gig' });
//             }
//             // Add the user to the applicants array if not already applied
//             if (gig.applicants.includes(req.user._id)) {
//                 return res.status(400).json({ message: 'You have already applied for this gig' });
//             }

//             gig.applicants.push(req.user._id);
//             gig.status = 'Pending Approval'; // Update status

//             await gig.save();
//             res.status(200).json({ message: 'Application submitted successfully' });
//         } else {
//             res.status(404).json({ message: 'Gig not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// @desc    Approve an applicant for a gig
// @route   PUT /api/gigs/:id/approve
// @access  Private (Requester only)
const approveGigApplicant = async (req, res) => {
    try {
        const { applicantId } = req.body; // The ID of the user to approve
        const gig = await Gig.findById(req.params.id);

        if (gig) {
            // Check if the logged-in user is the gig requester
            if (gig.requester.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to approve for this gig' });
            }

            // Set the approved applicant as the assignee
            gig.assignee = applicantId;
            gig.status = 'Booked';
            gig.applicants = []; // Clear the applicants list

            const updatedGig = await gig.save();
            res.status(200).json(updatedGig);
        } else {
            res.status(404).json({ message: 'Gig not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const applyForGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        if (gig.requester.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot apply for your own gig' });
        }

        if (gig.applicants.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already applied for this gig' });
        }

        gig.applicants.push(req.user._id);

        await gig.save();
        res.status(200).json({ message: 'Application submitted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const rejectGigApplicant = async (req, res) => {
    try {
        const { applicantId } = req.body;
        const gig = await Gig.findById(req.params.id);

        if (!gig) return res.status(404).json({ message: 'Gig not found' });

        if (gig.requester.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Remove applicant
        gig.applicants = gig.applicants.filter(
            (appId) => appId.toString() !== applicantId
        );

        await gig.save();
        res.status(200).json({ message: 'Applicant rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};






module.exports = {
    createGig,
    getGigs,
    getGigById,
    deleteGig,
    updateGig,
    approveGigApplicant,
    applyForGig,
    rejectGigApplicant


};