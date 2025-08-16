

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../services/authService';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            toast.error('You must agree to the terms and conditions.');
            return;
        }
        try {
            const data = await authService.register(formData);
            toast.success(data.message);
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    if (submitted) {
        return (
            <div className="flex justify-center items-center min-h-screen  ">
                <div className="w-full max-w-md p-8 text-center bg-white rounded-3xl shadow-lg border-4 border-black">
                    <h1 className="text-3xl font-bold text-[#6e48aa] mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                        Registration Successful!
                    </h1>
                    <p className="text-gray-700 mb-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                        We've sent a verification link to your email address. Please check your inbox to complete the process.
                    </p>
                    <div className="w-24 h-24 bg-[#6e48aa] rounded-full mx-auto flex items-center justify-center border-4 border-black">
                        <span className="text-4xl text-white">✓</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen   p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#6e48aa] mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                        Create an Account
                    </h1>
                    <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-[#6e48aa]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="h-5 w-5 text-[#6e48aa] border-2 border-gray-300 rounded focus:ring-[#6e48aa]"
                        />
                        <label htmlFor="agree" className="ml-2 block text-sm text-gray-900" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            I agree to the <a href="#" className="text-[#6e48aa] hover:underline font-bold">Terms and Conditions</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!agreed}
                        className="w-full px-4 py-3 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e48aa] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}
                    >
                        REGISTER NOW
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-[#6e48aa] hover:underline">LOGIN HERE</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;