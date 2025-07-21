const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // --- Other Fields Added Back ---
    university: {
        type: String,
        trim: true,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profilePicture: {
        type: String,
        default: 'https://i.imgur.com/V4Rcl9I.png', // Default avatar
    },
    isVerifiedStudent: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 500,
    },
    supportLinks: {
        buyMeACoffee: { type: String, default: '' },
        github: { type: String, default: '' },
    },
    reputation: {
        points: { type: Number, default: 0 },
        badges: [{ type: String }],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    savedNotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note',
        }
    ]
}, {
    timestamps: true,
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;