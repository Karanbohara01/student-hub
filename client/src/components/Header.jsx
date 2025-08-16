
// import { Link, useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';
// import { toast } from 'react-hot-toast';
// import io from 'socket.io-client';
// import { useEffect, useState, useRef } from 'react';
// import {
//     FiMenu, FiX, FiMessageSquare, FiBook, FiFileText, FiUser,
//     FiLogOut, FiLogIn, FiPlusCircle, FiList, FiChevronDown
// } from 'react-icons/fi';
// import { FaGraduationCap, FaBookmark, FaStar } from 'react-icons/fa';

// const socket = io('http://localhost:5001');

// const Header = () => {
//     const { userInfo, logout } = useAuthStore();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (userInfo) socket.emit('user_online', userInfo._id);
//     }, [userInfo]);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleLogout = () => {
//         logout();
//         toast.success('Logged out successfully');
//         navigate('/login');
//         setIsMobileMenuOpen(false);
//     };

//     return (
//         <header className="bg-white shadow-md sticky top-0 z-50 border-b border-purple-100 font-[Nunito Sans]">
//             <nav className="container mx-auto px-4 sm:px-6 py-3">
//                 {/* Desktop Nav */}
//                 <div className="hidden md:flex justify-between items-center">
//                     <Link to="/" className="text-3xl flex items-center font-extrabold text-purple-600 gap-2 hover:text-purple-700 transition">
//                         <FaGraduationCap className="text-4xl" />
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
//                             StudentHub
//                         </span>
//                     </Link>

//                     <div className="flex items-center space-x-6">
//                         <NavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>Toppers' Notes</NavLink>
//                         <NavLink to="/projects" icon={<FiBook />}>Projects</NavLink>
//                         <NavLink to="/books" icon={<FiFileText />}>Books</NavLink>
//                         <NavLink to="/notes" icon={<FiFileText />}>Notes</NavLink>
//                         <NavLink to="/gigs">Gigs</NavLink>
//                     </div>

//                     <div className="relative" ref={dropdownRef}>
//                         {userInfo ? (
//                             <>
//                                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center px-4 py-2 font-semibold text-purple-700 border border-purple-200 rounded-full bg-white hover:bg-purple-50 shadow-md transition-all">
//                                     <FiUser className="mr-2" />
//                                     Account
//                                     <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                                 </button>
//                                 {isDropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-purple-100 z-50">
//                                         <DropdownLink to="/chat" icon={<FiMessageSquare />}>Chat</DropdownLink>
//                                         <DropdownLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}><span className="text-purple-600">Contribute</span></DropdownLink>
//                                         <DropdownLink to="/my-listings" icon={<FiList />}>My Listings</DropdownLink>
//                                         <DropdownLink to="/my-favorites" icon={<FaBookmark className="text-purple-600" />}>Favorites</DropdownLink>
//                                         <DropdownLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</DropdownLink>
//                                         <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 font-semibold border-t border-gray-100">
//                                             <FiLogOut className="mr-2" /> Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="flex items-center gap-4">
//                                 <NavLink to="/login" icon={<FiLogIn />}>Login</NavLink>
//                                 <Link to="/register" className="px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-full shadow hover:from-purple-600 hover:to-purple-800 transition-all">
//                                     Register
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Nav */}
//                 <div className="md:hidden flex justify-between items-center">
//                     <Link to="/" className="text-xl font-bold text-purple-600 flex items-center">
//                         <FaGraduationCap className="mr-2" />
//                         StudentHub
//                     </Link>
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 hover:text-purple-600 rounded-md hover:bg-purple-100 transition-colors">
//                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                     </button>
//                 </div>

//                 {isMobileMenuOpen && (
//                     <div className="md:hidden bg-white mt-2 rounded-xl shadow-lg py-2 space-y-1">
//                         <MobileNavLink to="/projects" icon={<FiBook />}>Projects</MobileNavLink>
//                         <MobileNavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>Toppers' Notes</MobileNavLink>
//                         <MobileNavLink to="/books" icon={<FiFileText />}>Books</MobileNavLink>
//                         <MobileNavLink to="/notes" icon={<FiFileText />}>Notes</MobileNavLink>
//                         {userInfo ? (
//                             <>
//                                 <MobileNavLink to="/chat" icon={<FiMessageSquare />}>Chat</MobileNavLink>
//                                 <MobileNavLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}><span className="text-purple-600">Contribute</span></MobileNavLink>
//                                 <MobileNavLink to="/my-listings" icon={<FiList />}>My Listings</MobileNavLink>
//                                 <MobileNavLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</MobileNavLink>
//                                 <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 flex items-center">
//                                     <FiLogOut className="mr-3" /> Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <MobileNavLink to="/login" icon={<FiLogIn />}>Login</MobileNavLink>
//                                 <Link to="/register" className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-lg shadow hover:from-purple-600 hover:to-purple-800">
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </nav>
//         </header>
//     );
// };

// const NavLink = ({ to, children, icon }) => (
//     <Link to={to} className="text-gray-800 hover:text-purple-600 font-semibold flex items-center transition px-3 py-2 rounded-lg hover:bg-purple-50">
//         {icon && <span className="mr-2">{icon}</span>}
//         {children}
//     </Link>
// );

// const MobileNavLink = ({ to, children, icon, className = '' }) => (
//     <Link to={to} className={`text-gray-800 hover:text-purple-600 font-medium flex items-center py-3 px-4 rounded-lg hover:bg-purple-50 ${className}`}>
//         {icon && <span className="mr-3">{icon}</span>}
//         {children}
//     </Link>
// );


// const DropdownLink = ({ to, children, icon, className = '' }) => (
//     <Link to={to} className={`flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 transition ${className}`}>
//         {icon && <span className="mr-3">{icon}</span>}
//         {children}
//     </Link>
// );

// export default Header;


import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import {
    FiMenu, FiX, FiMessageSquare, FiBook, FiFileText, FiUser,
    FiLogOut, FiLogIn, FiPlusCircle, FiList, FiChevronDown
} from 'react-icons/fi';
import { FaGraduationCap, FaBookmark, FaStar } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const socket = io('http://localhost:5001');

const Header = () => {
    const { userInfo, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const mobileMenuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) socket.emit('user_online', userInfo._id);
    }, [userInfo]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) &&
                !document.querySelector('.mobile-menu-button')?.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-purple-50 font-[Nunito Sans]">
            <nav className="container mx-auto px-4 sm:px-6 py-3">
                {/* Desktop Nav */}
                <div className="hidden md:flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-3xl flex items-center font-extrabold text-purple-600 gap-2 hover:text-purple-700 transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <FaGraduationCap className="text-4xl" />
                        </motion.div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                            StudentHub
                        </span>
                    </Link>

                    <div className="flex items-center space-x-2">
                        <NavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>Toppers' Notes</NavLink>
                        <NavLink to="/projects" icon={<FiBook />}>Projects</NavLink>
                        <NavLink to="/books" icon={<FiFileText />}>Books</NavLink>
                        <NavLink to="/notes" icon={<FiFileText />}>Notes</NavLink>
                        <NavLink to="/gigs">Gigs</NavLink>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        {userInfo ? (
                            <>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center px-4 py-2 font-semibold text-purple-700 border border-purple-200 rounded-full bg-white hover:bg-purple-50 shadow-sm transition-all hover:shadow-md active:scale-95"
                                >
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                        <FiUser className="text-purple-600 text-sm" />
                                    </div>
                                    Account
                                    <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border border-purple-100 z-50 overflow-hidden"
                                        >
                                            <DropdownLink to="/chat" icon={<FiMessageSquare />} closeDropdown={closeDropdown}>Chat</DropdownLink>
                                            <DropdownLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />} closeDropdown={closeDropdown}>
                                                <span className="text-purple-600 font-semibold">Contribute</span>
                                            </DropdownLink>
                                            <DropdownLink to="/my-listings" icon={<FiList />} closeDropdown={closeDropdown}>My Listings</DropdownLink>
                                            <DropdownLink to="/my-favorites" icon={<FaBookmark className="text-purple-600" />} closeDropdown={closeDropdown}>Favorites</DropdownLink>
                                            <DropdownLink to={`/profile/${userInfo._id}`} icon={<FiUser />} closeDropdown={closeDropdown}>Profile</DropdownLink>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 font-semibold border-t border-gray-100 transition-colors"
                                            >
                                                <FiLogOut className="mr-2" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <NavLink to="/login" icon={<FiLogIn />}>Login</NavLink>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-full shadow hover:from-purple-600 hover:to-purple-800 transition-all hover:shadow-md active:scale-95"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-xl font-bold text-purple-600 flex items-center hover:scale-[1.02] transition-transform"
                    >
                        <FaGraduationCap className="mr-2" />
                        StudentHub
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mobile-menu-button p-2 text-gray-700 hover:text-purple-600 rounded-md hover:bg-purple-100 transition-colors"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white mt-2 rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="py-2 space-y-1">
                                <MobileNavLink to="/projects" icon={<FiBook />} closeMenu={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
                                <MobileNavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />} closeMenu={() => setIsMobileMenuOpen(false)}>Toppers' Notes</MobileNavLink>
                                <MobileNavLink to="/books" icon={<FiFileText />} closeMenu={() => setIsMobileMenuOpen(false)}>Books</MobileNavLink>
                                <MobileNavLink to="/notes" icon={<FiFileText />} closeMenu={() => setIsMobileMenuOpen(false)}>Notes</MobileNavLink>
                                {userInfo ? (
                                    <>
                                        <MobileNavLink to="/chat" icon={<FiMessageSquare />} closeMenu={() => setIsMobileMenuOpen(false)}>Chat</MobileNavLink>
                                        <MobileNavLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />} closeMenu={() => setIsMobileMenuOpen(false)}>
                                            <span className="text-purple-600 font-semibold">Contribute</span>
                                        </MobileNavLink>
                                        <MobileNavLink to="/my-listings" icon={<FiList />} closeMenu={() => setIsMobileMenuOpen(false)}>My Listings</MobileNavLink>
                                        <MobileNavLink to={`/profile/${userInfo._id}`} icon={<FiUser />} closeMenu={() => setIsMobileMenuOpen(false)}>Profile</MobileNavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 flex items-center transition-colors"
                                        >
                                            <FiLogOut className="mr-3" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <MobileNavLink to="/login" icon={<FiLogIn />} closeMenu={() => setIsMobileMenuOpen(false)}>Login</MobileNavLink>
                                        <Link
                                            to="/register"
                                            className="block w-full text-center mx-2 my-2 px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-lg shadow hover:from-purple-600 hover:to-purple-800 transition-all"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

const NavLink = ({ to, children, icon }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
            to={to}
            className="text-gray-700 hover:text-purple-600 font-medium flex items-center transition px-3 py-2 rounded-lg hover:bg-purple-50"
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Link>
    </motion.div>
);

const MobileNavLink = ({ to, children, icon, closeMenu, className = '' }) => (
    <motion.div whileTap={{ scale: 0.98 }}>
        <Link
            to={to}
            onClick={closeMenu}
            className={`text-gray-700 hover:text-purple-600 font-medium flex items-center py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors ${className}`}
        >
            {icon && <span className="mr-3">{icon}</span>}
            {children}
        </Link>
    </motion.div>
);

const DropdownLink = ({ to, children, icon, closeDropdown, className = '' }) => (
    <motion.div whileHover={{ x: 5 }} whileTap={{ x: 0 }}>
        <Link
            to={to}
            onClick={closeDropdown}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors ${className}`}
        >
            {icon && <span className="mr-3">{icon}</span>}
            {children}
        </Link>
    </motion.div>
);

export default Header;