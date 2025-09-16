

import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import {
    FaBook,
    FaProjectDiagram,
    FaClipboardList,
    FaComments,
    FaCheckCircle,
    FaUsers,
    FaExchangeAlt,
    FaSearch,
    FaUserFriends
} from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

const FeatureCard = ({ icon, title, description, link }) => (
    <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
        <Link
            to={link || '#'}
            className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-400"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl mb-4">
                {icon}
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </Link>
    </motion.div>
);

const HomePage = () => {
    const { userInfo } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            {userInfo ? (
                // Logged-in User View
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Welcome back, <span className="text-purple-600">{userInfo.name}</span>! 👋
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Let's get started. What would you like to do today?
                        </p>
                    </motion.div>

                    {/* Feature Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <FeatureCard
                            icon={<FaProjectDiagram size={20} />}
                            title="Projects"
                            description="Browse and share course projects."
                            link="/projects"
                        />
                        <FeatureCard
                            icon={<FaBook size={20} />}
                            title="Book Exchange"
                            description="Buy, sell, or exchange textbooks."
                            link="/books"
                        />
                        <FeatureCard
                            icon={<FaClipboardList size={20} />}
                            title="Notes Library"
                            description="Find and contribute study notes."
                            link="/notes"
                        />
                        <FeatureCard
                            icon={<FaComments size={20} />}
                            title="My Messages"
                            description="Check your ongoing conversations."
                            link="/chat"
                        />
                        <FeatureCard
                            icon={<FaUserFriends size={20} />}
                            title="Study Groups"
                            description="Join or create study groups."
                            link="/groups"
                        />
                        <FeatureCard
                            icon={<FaCheckCircle size={20} />}
                            title="Task Manager"
                            description="Organize your academic tasks."
                            link="/tasks"
                        />
                    </motion.div>
                </div>
            ) : (
                // Guest Landing Page
                <div className="overflow-hidden">
                    {/* Hero Section */}
                    <section className="relative bg-gradient-to-br from-purple-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                                >
                                    The Ultimate <span className="text-purple-600">Student Hub</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                                >
                                    Access projects, share notes, exchange books, and collaborate with peers from across Nepal.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-col sm:flex-row justify-center gap-4"
                                >
                                    <Link
                                        to="/register"
                                        className="px-8 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Get Started - It's Free
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-8 py-3 font-bold text-purple-600 bg-white rounded-lg hover:bg-gray-50 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Already a member? Sign In
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Hero Illustration */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="mt-16 max-w-4xl mx-auto"
                            >
                                <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
                                    <div className="grid grid-cols-3 gap-4">
                                        {[1, 2, 3, 4, 5, 6].map((item) => (
                                            <div key={item} className="bg-gray-100 rounded-lg aspect-square"></div>
                                        ))}
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white p-3 rounded-lg shadow-lg">
                                        <FaSearch size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Everything a Student Needs
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    Our platform provides all the tools you need to succeed in your academic journey.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaProjectDiagram size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Project Marketplace</h3>
                                    <p className="text-gray-600">
                                        Buy and sell final year projects, assignments, and code with easy search and filtering options.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaBook size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Notes Library</h3>
                                    <p className="text-gray-600">
                                        Access a vast, categorized library of notes from Class 10 to Masters level courses.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaExchangeAlt size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Book Exchange</h3>
                                    <p className="text-gray-600">
                                        Save money by exchanging textbooks with other students in your area or institution.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaUsers size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Study Groups</h3>
                                    <p className="text-gray-600">
                                        Create or join study groups to collaborate with peers on assignments and projects.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaComments size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Chat</h3>
                                    <p className="text-gray-600">
                                        Get instant help with assignments and share ideas through our messaging system.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-50 p-8 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl mb-6">
                                        <FaCheckCircle size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">Task Manager</h3>
                                    <p className="text-gray-600">
                                        Organize your academic tasks, set deadlines, and track your progress all in one place.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Trusted by Students Across Nepal
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    Join thousands of students who are already benefiting from our platform.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        quote: "This platform saved me so much time finding quality notes for my engineering courses.",
                                        name: "Ramesh Shrestha",
                                        role: "Computer Engineering Student"
                                    },
                                    {
                                        quote: "I sold my old textbooks and made enough money to buy the ones I needed for next semester!",
                                        name: "Sita Gurung",
                                        role: "BBA Student"
                                    },
                                    {
                                        quote: "The project marketplace helped me find inspiration for my final year project at an affordable price.",
                                        name: "Amit Kumar",
                                        role: "IT Student"
                                    }
                                ].map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        className="bg-white p-8 rounded-xl shadow-md border border-gray-200"
                                    >
                                        <div className="text-purple-500 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div>
                                        <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                                        <div>
                                            <p className="font-bold text-gray-800">{testimonial.name}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                            >
                                Ready to Transform Your Academic Experience?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-purple-100 mb-8"
                            >
                                Join thousands of students and unlock a world of academic resources today.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row justify-center gap-4"
                            >
                                <Link
                                    to="/register"
                                    className="px-8 py-3 font-bold text-purple-600 bg-white rounded-lg hover:bg-gray-100 shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Sign Up Now - Free Forever
                                </Link>
                                <Link
                                    to="/features"
                                    className="px-8 py-3 font-bold text-white border-2 border-white rounded-lg hover:bg-purple-700 shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Learn More
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default HomePage;