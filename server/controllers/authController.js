// Use require for CommonJS modules
const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');



const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user but don't log them in yet
        const user = new User({
            name,
            email,
            password,
            // Generate a verification token
            emailVerificationToken: crypto.randomBytes(20).toString('hex'),
        });

        await user.save();

        // --- Send Verification Email ---
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const verificationLink = `http://localhost:5173/verify-email/${user.emailVerificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify Your Email for StudentHub',
            html: `<p>Please verify your email by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ emailVerificationToken: token });

        // If no user is found with this token
        if (!user) {
            // It's possible the user is already verified and the token was deleted.
            // We don't need to send an error in that case, the frontend will handle it.
            // For a truly invalid link, we send an error.
            // To keep it simple, we can just let the frontend handle the redirect.
            return res.status(404).json({ message: 'Invalid or expired verification link.' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined; // Token is one-time use
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // --- ADD THIS CHECK ---
            if (!user.isEmailVerified) {
                return res.status(401).json({ message: 'Please verify your email before logging in.' });
            }
            // --- END OF CHECK ---

            generateToken(res, user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // We send a success message even if the user isn't found
            // to prevent email enumeration attacks.
            return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
        }

        // 1. Generate a plain reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // 2. Hash the token and save it to the database
        user.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // 3. Set an expiry date (e.g., 10 minutes)
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        // 4. Send the email with the PLAIN token
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        // Setup Nodemailer to send email (as we did for verification)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Token for StudentHub',
            text: message,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });

    } catch (error) {
        // Clear reset fields if something goes wrong
        // const user = await User.findOne({ email: req.body.email });
        // user.passwordResetToken = undefined;
        // user.passwordResetExpires = undefined;
        // await user.save();
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
    try {
        // 1. Get the hashed token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        // 2. Find user by hashed token and check if it's not expired
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        // 3. Set the new password
        user.password = req.body.password;
        // 4. Clear the reset token fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        // We can generate a new login token here if we want to auto-login the user
        // generateToken(res, user._id); 

        res.status(200).json({ message: 'Password has been reset successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Use module.exports for CommonJS
module.exports = { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword };