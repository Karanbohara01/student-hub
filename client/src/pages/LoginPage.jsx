


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../services/authService';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const loginStore = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const data = await authService.login(userData);
            loginStore(data);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#6e48aa] p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-lg border-4 border-black">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#6e48aa] mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
                        Login to Your Account
                    </h1>
                    <div className="w-16 h-2 bg-[#48aae6] rounded-full mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e48aa] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border-2 border-black"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", letterSpacing: "0.5px" }}
                    >
                        LOGIN
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-[#6e48aa] hover:underline">REGISTER HERE</Link>
                </p>
                <div className="text-center">
                    <Link to="/forgot-password" className="text-sm font-medium text-duo-blue hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <p className="text-md text-center text-duo-gray mt-8">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-duo-blue hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;