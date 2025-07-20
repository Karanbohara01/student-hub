

import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiMessageSquare, FiBook, FiFileText, FiUser, FiLogOut, FiLogIn, FiPlusCircle, FiList } from 'react-icons/fi';
import { FaBook, FaBookmark, FaGraduationCap } from 'react-icons/fa';

const socket = io('http://localhost:5001');

const Header = () => {
    const { userInfo, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            socket.emit('user_online', userInfo._id);
        }
    }, [userInfo]);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-lg border-b-4 border-black sticky top-0 z-50">

            <nav className="container mx-auto px-4 sm:px-6 py-3">


                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-between  items-center">
                    <Link

                        to="/"
                        className="text-2xl flex font-bold text-[#6e48aa] mx-4 flex-row items-center gap-2"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                    >

                        <FaGraduationCap className="text-4xl text-purple-800" />
                        StudentHub


                    </Link>
                    {/* Left side links */}
                    <div className="flex items-center space-x-6">
                        <NavLink to="/projects" icon={<FiBook size={18} />}>
                            PROJECTS
                        </NavLink>
                        <NavLink to="/books" icon={<FiFileText size={18} />}>
                            BOOKS
                        </NavLink>
                        <NavLink to="/notes" icon={<FiFileText size={18} />}>
                            NOTES
                        </NavLink>
                    </div>

                    {/* Center Logo */}


                    {/* Right side auth links */}
                    <div className="flex items-center space-x-4">
                        {userInfo ? (
                            <>
                                <NavLink to="/chat" icon={<FiMessageSquare size={18} />}>
                                    CHAT
                                </NavLink>
                                <NavLink to="/notes/upload" icon={<FiPlusCircle size={18} />} className="text-green-600 hover:text-green-800">
                                    CONTRIBUTE
                                </NavLink>
                                <NavLink to="/my-listings" icon={<FiList size={18} />}>
                                    MY LISTINGS
                                </NavLink>
                                <NavLink to="/my-favorites" className="font-bold text-gray-600 hover:text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                    <FaBookmark />
                                </NavLink>
                                <NavLink to="/profile" icon={<FiUser size={18} />}>
                                    PROFILE
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 font-bold text-white bg-[#ff4757] rounded-xl hover:bg-[#ff6b81] shadow-md border-2 border-black flex items-center"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                >
                                    <FiLogOut className="mr-2" /> LOGOUT
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" icon={<FiLogIn size={18} />}>
                                    LOGIN
                                </NavLink>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] shadow-md border-2 border-black flex items-center"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                >
                                    REGISTER
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center justify-between">
                    {/* Mobile Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-[#6e48aa]"
                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                    >
                        StudentHub
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-[#6e48aa] focus:outline-none"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Content */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-b-lg">
                        <div className="flex flex-col space-y-4">
                            <MobileNavLink to="/projects" icon={<FiBook />} onClick={toggleMobileMenu}>
                                PROJECTS
                            </MobileNavLink>
                            <MobileNavLink to="/books" icon={<FiFileText />} onClick={toggleMobileMenu}>
                                BOOKS
                            </MobileNavLink>
                            <MobileNavLink to="/notes" icon={<FiFileText />} onClick={toggleMobileMenu}>
                                NOTES
                            </MobileNavLink>

                            {userInfo ? (
                                <>
                                    {userInfo && userInfo.isAdmin && (
                                        <Link to="/admin/notes" className="font-bold text-red-500 hover:text-red-700">
                                            ADMIN
                                        </Link>
                                    )}
                                    <MobileNavLink to="/chat" icon={<FiMessageSquare />} onClick={toggleMobileMenu}>
                                        CHAT
                                    </MobileNavLink>
                                    <MobileNavLink to="/notes/upload" icon={<FiPlusCircle />} onClick={toggleMobileMenu} className="text-green-600 hover:text-green-800">
                                        CONTRIBUTE
                                    </MobileNavLink>
                                    <MobileNavLink to="/my-listings" icon={<FiList />} onClick={toggleMobileMenu}>
                                        MY LISTINGS
                                    </MobileNavLink>
                                    <MobileNavLink to="/profile" icon={<FiUser />} onClick={toggleMobileMenu}>
                                        PROFILE
                                    </MobileNavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 font-bold text-white bg-[#ff4757] rounded-xl hover:bg-[#ff6b81] shadow-md border-2 border-black flex items-center justify-center"
                                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                    >
                                        <FiLogOut className="mr-2" /> LOGOUT
                                    </button>
                                </>
                            ) : (
                                <>
                                    <MobileNavLink to="/login" icon={<FiLogIn />} onClick={toggleMobileMenu}>
                                        LOGIN
                                    </MobileNavLink>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 font-bold text-white bg-[#6e48aa] rounded-xl hover:bg-[#5a3a8a] shadow-md border-2 border-black flex items-center justify-center"
                                        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                        onClick={toggleMobileMenu}
                                    >
                                        REGISTER
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

// Reusable NavLink component for desktop
const NavLink = ({ to, children, icon, className = '' }) => (
    <Link
        to={to}
        className={`text-gray-600 hover:text-[#6e48aa] font-bold flex items-center ${className}`}
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
    </Link>
);

// Reusable NavLink component for mobile
const MobileNavLink = ({ to, children, icon, onClick, className = '' }) => (
    <Link
        to={to}
        className={`text-gray-600 hover:text-[#6e48aa] font-bold flex items-center py-2 px-4 rounded-lg hover:bg-purple-50 ${className}`}
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        onClick={onClick}
    >
        {icon && <span className="mr-3">{icon}</span>}
        {children}
    </Link>
);

export default Header;