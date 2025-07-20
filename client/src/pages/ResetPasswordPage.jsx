import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authService from '../services/authService';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }
        try {
            const data = await authService.resetPassword(token, password);
            toast.success(data.message);
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Reset failed');
        }
    };

    if (submitted) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#6e48aa]">
                <div className="w-full max-w-md p-8 text-center bg-white rounded-3xl shadow-lg border-4 border-black">
                    <h1 className="text-2xl font-bold text-green-600 mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Password Reset!</h1>
                    <p className="text-gray-700" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Your password has been changed successfully.</p>
                    <Link to="/login" className="inline-block mt-6 px-6 py-2 font-medium text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a]">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#6e48aa] mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                        Reset Your Password
                    </h1>
                    <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto"></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e48aa] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;