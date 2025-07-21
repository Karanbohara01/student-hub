

// import { Link, useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';
// import { toast } from 'react-hot-toast';
// import io from 'socket.io-client';
// import { useEffect, useState, useRef } from 'react';
// import {
//     FiMenu, FiX, FiMessageSquare, FiBook, FiFileText, FiUser,
//     FiLogOut, FiLogIn, FiPlusCircle, FiList
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
//         if (userInfo) {
//             socket.emit('user_online', userInfo._id);
//         }
//     }, [userInfo]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleLogout = () => {
//         logout();
//         toast.success('Logged out successfully');
//         navigate('/login');
//         setIsMobileMenuOpen(false);
//     };

//     return (
//         <header className="bg-white shadow-lg border-b-4 border-black sticky top-0 z-50">
//             <nav className="container mx-auto px-4 sm:px-6 py-3">
//                 {/* Desktop Navigation */}
//                 <div className="hidden md:flex justify-between items-center">
//                     <Link to="/" className="text-2xl flex font-bold text-[#6e48aa] mx-4 flex-row items-center gap-2" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
//                         <FaGraduationCap className="text-4xl text-purple-800" />
//                         StudentHub
//                     </Link>
//                     <div className="flex items-center space-x-6">
//                         <NavLink to="/notes-from-toppers" icon={<FaStar size={18} className='text-yellow-400' />}>TOPPERS' NOTES</NavLink>
//                         <NavLink to="/projects" icon={<FiBook size={18} />}>PROJECTS</NavLink>
//                         <NavLink to="/books" icon={<FiFileText size={18} />}>BOOKS</NavLink>
//                         <NavLink to="/notes" icon={<FiFileText size={18} />}>NOTES</NavLink>
//                         <Link to="/gigs" className="font-bold text-gray-600 hover:text-[#6e48aa]">GIGS</Link>
//                     </div>
//                     <div className="relative" ref={dropdownRef}>
//                         {userInfo ? (
//                             <>
//                                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-4 py-2 font-bold bg-gray-100 border-2 border-black rounded-xl hover:bg-gray-200 text-[#6e48aa] flex items-center">
//                                     <FiUser className="mr-2" /> Account
//                                 </button>
//                                 {isDropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-300 z-50">
//                                         <DropdownLink to="/chat" icon={<FiMessageSquare />}>Chat</DropdownLink>
//                                         <DropdownLink to="/notes/upload" icon={<FiPlusCircle />} className="text-purple-600">Contribute</DropdownLink>
//                                         <DropdownLink to="/my-listings" icon={<FiList />}>My Listings</DropdownLink>
//                                         <DropdownLink to="/my-favorites" icon={<FaBookmark />}>Favorites</DropdownLink>
//                                         <DropdownLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</DropdownLink>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="w-full flex items-center px-4 py-2 text-red-600 hover:text-white hover:bg-red-500 font-bold border-t border-gray-200"
//                                         >
//                                             <FiLogOut className="mr-2" /> Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="flex space-x-4">
//                                 <NavLink to="/login" icon={<FiLogIn />}>LOGIN</NavLink>
//                                 <Link to="/register" className="px-4 py-2 font-bold text-white bg-[#6e48aa] rounded-xl border-2 border-black flex items-center">
//                                     REGISTER
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 <div className="md:hidden flex items-center justify-between">
//                     <Link to="/" className="text-xl font-bold text-[#6e48aa]">StudentHub</Link>
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
//                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                     </button>
//                 </div>
//                 {isMobileMenuOpen && (
//                     <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-b-lg">
//                         <MobileNavLink to="/projects" icon={<FiBook />}>PROJECTS</MobileNavLink>
//                         <NavLink to="/notes-from-toppers" icon={<FaStar size={18} className='text-yellow-400' />}>TOPPERS' NOTES</NavLink>

//                         <MobileNavLink to="/books" icon={<FiFileText />}>BOOKS</MobileNavLink>
//                         <MobileNavLink to="/notes" icon={<FiFileText />}>NOTES</MobileNavLink>
//                         {userInfo && <>
//                             <MobileNavLink to="/chat" icon={<FiMessageSquare />}>CHAT</MobileNavLink>

//                             <MobileNavLink to="/notes/upload" icon={<FiPlusCircle />} className="text-purple-600">CONTRIBUTE</MobileNavLink>
//                             <MobileNavLink to="/my-listings" icon={<FiList />}>MY LISTINGS</MobileNavLink>
//                             <MobileNavLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>PROFILE</MobileNavLink>
//                             <button onClick={handleLogout} className="w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center">
//                                 <FiLogOut className="mr-2" /> Logout
//                             </button>
//                         </>}
//                         {!userInfo && <>
//                             <MobileNavLink to="/login" icon={<FiLogIn />}>LOGIN</MobileNavLink>
//                             <Link to="/register" className="w-full px-4 py-2 font-bold text-white bg-[#6e48aa] rounded-xl flex items-center justify-center">REGISTER</Link>
//                         </>}
//                     </div>
//                 )}
//             </nav>
//         </header>
//     );
// };

// const NavLink = ({ to, children, icon }) => (
//     <Link to={to} className="text-gray-600 hover:text-[#6e48aa] font-bold flex items-center" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
//         {icon && <span className="mr-2">{icon}</span>}
//         {children}
//     </Link>
// );

// const MobileNavLink = ({ to, children, icon, className = '' }) => (
//     <Link to={to} className={`text-gray-600 hover:text-[#6e48aa] font-bold flex items-center py-2 px-4 rounded-lg hover:bg-purple-50 ${className}`} style={{ fontFamily: "'Comic Sans MS', cursive" }}>
//         {icon && <span className="mr-3">{icon}</span>}
//         {children}
//     </Link>
// );

// const DropdownLink = ({ to, children, icon, className = '' }) => (
//     <Link to={to} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${className}`}>
//         {icon && <span className="mr-2">{icon}</span>}
//         {children}
//     </Link>
// );

// export default Header;

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
//         if (userInfo) {
//             socket.emit('user_online', userInfo._id);
//         }
//     }, [userInfo]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleLogout = () => {
//         logout();
//         toast.success('Logged out successfully');
//         navigate('/login');
//         setIsMobileMenuOpen(false);
//     };

//     return (
//         <header className="bg-white shadow-md sticky top-0 z-50 border-b border-purple-100">
//             <nav className="container mx-auto px-4 sm:px-6 py-3">
//                 {/* Desktop Navigation */}
//                 <div className="hidden md:flex justify-between items-center">
//                     <Link
//                         to="/"
//                         className="text-2xl flex font-bold text-purple-700 mx-4 flex-row items-center gap-2 hover:text-purple-600 transition-colors"
//                     >
//                         <FaGraduationCap className="text-4xl text-purple-700" />
//                         <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
//                             StudentHub
//                         </span>
//                     </Link>

//                     <div className="flex items-center space-x-8">
//                         <NavLink to="/notes-from-toppers" icon={<FaStar className='text-yellow-400' />}>
//                             TOPPERS' NOTES
//                         </NavLink>
//                         <NavLink to="/projects" icon={<FiBook />}>PROJECTS</NavLink>
//                         <NavLink to="/books" icon={<FiFileText />}>BOOKS</NavLink>
//                         <NavLink to="/notes" icon={<FiFileText />}>NOTES</NavLink>
//                         <NavLink to="/gigs">GIGS</NavLink>
//                     </div>

//                     <div className="relative" ref={dropdownRef}>
//                         {userInfo ? (
//                             <>
//                                 <button
//                                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                                     className="px-4 py-2 font-medium bg-white text-purple-700 rounded-lg hover:bg-purple-50 border border-purple-200 flex items-center transition-colors shadow-sm"
//                                 >
//                                     <FiUser className="mr-2" />
//                                     Account
//                                     <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
//                                 </button>
//                                 {isDropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-purple-100 z-50 overflow-hidden">
//                                         <DropdownLink to="/chat" icon={<FiMessageSquare />}>Chat</DropdownLink>
//                                         <DropdownLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}>
//                                             <span className="text-purple-600">Contribute</span>
//                                         </DropdownLink>
//                                         <DropdownLink to="/my-listings" icon={<FiList />}>My Listings</DropdownLink>
//                                         <DropdownLink to="/my-favorites" icon={<FaBookmark className="text-purple-600" />}>
//                                             Favorites
//                                         </DropdownLink>
//                                         <DropdownLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</DropdownLink>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 font-medium border-t border-gray-100 transition-colors"
//                                         >
//                                             <FiLogOut className="mr-2" /> Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="flex space-x-4">
//                                 <NavLink to="/login" icon={<FiLogIn />}>LOGIN</NavLink>
//                                 <Link
//                                     to="/register"
//                                     className="px-4 py-2 font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg hover:from-purple-700 hover:to-purple-900 flex items-center transition-all shadow-md"
//                                 >
//                                     REGISTER
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 <div className="md:hidden flex items-center justify-between">
//                     <Link
//                         to="/"
//                         className="text-xl font-bold text-purple-700 flex items-center"
//                     >
//                         <FaGraduationCap className="mr-2" />
//                         StudentHub
//                     </Link>
//                     <button
//                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         className="p-2 text-gray-700 hover:text-purple-700 rounded-md hover:bg-purple-50 transition-colors"
//                     >
//                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                     </button>
//                 </div>

//                 {isMobileMenuOpen && (
//                     <div className="md:hidden bg-white py-2 px-2 shadow-lg rounded-b-lg mt-2 space-y-1">
//                         <MobileNavLink to="/projects" icon={<FiBook />}>PROJECTS</MobileNavLink>
//                         <MobileNavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>
//                             TOPPERS' NOTES
//                         </MobileNavLink>
//                         <MobileNavLink to="/books" icon={<FiFileText />}>BOOKS</MobileNavLink>
//                         <MobileNavLink to="/notes" icon={<FiFileText />}>NOTES</MobileNavLink>

//                         {userInfo ? (
//                             <>
//                                 <MobileNavLink to="/chat" icon={<FiMessageSquare />}>CHAT</MobileNavLink>
//                                 <MobileNavLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}>
//                                     <span className="text-purple-600">CONTRIBUTE</span>
//                                 </MobileNavLink>
//                                 <MobileNavLink to="/my-listings" icon={<FiList />}>MY LISTINGS</MobileNavLink>
//                                 <MobileNavLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>PROFILE</MobileNavLink>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-start font-medium"
//                                 >
//                                     <FiLogOut className="mr-3" /> Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <MobileNavLink to="/login" icon={<FiLogIn />}>LOGIN</MobileNavLink>
//                                 <Link
//                                     to="/register"
//                                     className="w-full px-4 py-3 font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mt-2"
//                                 >
//                                     REGISTER
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
//     <Link
//         to={to}
//         className="text-gray-700 hover:text-purple-700 font-medium flex items-center transition-colors px-3 py-2 rounded-md hover:bg-purple-50"
//     >
//         {icon && <span className="mr-2">{icon}</span>}
//         {children}
//     </Link>
// );

// const MobileNavLink = ({ to, children, icon, className = '' }) => (
//     <Link
//         to={to}
//         className={`text-gray-700 hover:text-purple-700 font-medium flex items-center py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors ${className}`}
//     >
//         {icon && <span className="mr-3">{icon}</span>}
//         {children}
//     </Link>
// );

// const DropdownLink = ({ to, children, icon, className = '' }) => (
//     <Link
//         to={to}
//         className={`flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors ${className}`}
//     >
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

const socket = io('http://localhost:5001');

const Header = () => {
    const { userInfo, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) socket.emit('user_online', userInfo._id);
    }, [userInfo]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
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
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-purple-100 font-[Nunito Sans]">
            <nav className="container mx-auto px-4 sm:px-6 py-3">
                {/* Desktop Nav */}
                <div className="hidden md:flex justify-between items-center">
                    <Link to="/" className="text-3xl flex items-center font-extrabold text-purple-600 gap-2 hover:text-purple-700 transition">
                        <FaGraduationCap className="text-4xl" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                            StudentHub
                        </span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <NavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>Toppers' Notes</NavLink>
                        <NavLink to="/projects" icon={<FiBook />}>Projects</NavLink>
                        <NavLink to="/books" icon={<FiFileText />}>Books</NavLink>
                        <NavLink to="/notes" icon={<FiFileText />}>Notes</NavLink>
                        <NavLink to="/gigs">Gigs</NavLink>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        {userInfo ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center px-4 py-2 font-semibold text-purple-700 border border-purple-200 rounded-full bg-white hover:bg-purple-50 shadow-md transition-all">
                                    <FiUser className="mr-2" />
                                    Account
                                    <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-purple-100 z-50">
                                        <DropdownLink to="/chat" icon={<FiMessageSquare />}>Chat</DropdownLink>
                                        <DropdownLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}><span className="text-purple-600">Contribute</span></DropdownLink>
                                        <DropdownLink to="/my-listings" icon={<FiList />}>My Listings</DropdownLink>
                                        <DropdownLink to="/my-favorites" icon={<FaBookmark className="text-purple-600" />}>Favorites</DropdownLink>
                                        <DropdownLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</DropdownLink>
                                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 font-semibold border-t border-gray-100">
                                            <FiLogOut className="mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <NavLink to="/login" icon={<FiLogIn />}>Login</NavLink>
                                <Link to="/register" className="px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-full shadow hover:from-purple-600 hover:to-purple-800 transition-all">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-purple-600 flex items-center">
                        <FaGraduationCap className="mr-2" />
                        StudentHub
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700 hover:text-purple-600 rounded-md hover:bg-purple-100 transition-colors">
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white mt-2 rounded-xl shadow-lg py-2 space-y-1">
                        <MobileNavLink to="/projects" icon={<FiBook />}>Projects</MobileNavLink>
                        <MobileNavLink to="/notes-from-toppers" icon={<FaStar className="text-yellow-400" />}>Toppers' Notes</MobileNavLink>
                        <MobileNavLink to="/books" icon={<FiFileText />}>Books</MobileNavLink>
                        <MobileNavLink to="/notes" icon={<FiFileText />}>Notes</MobileNavLink>
                        {userInfo ? (
                            <>
                                <MobileNavLink to="/chat" icon={<FiMessageSquare />}>Chat</MobileNavLink>
                                <MobileNavLink to="/notes/upload" icon={<FiPlusCircle className="text-purple-500" />}><span className="text-purple-600">Contribute</span></MobileNavLink>
                                <MobileNavLink to="/my-listings" icon={<FiList />}>My Listings</MobileNavLink>
                                <MobileNavLink to={`/profile/${userInfo._id}`} icon={<FiUser />}>Profile</MobileNavLink>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-50 flex items-center">
                                    <FiLogOut className="mr-3" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <MobileNavLink to="/login" icon={<FiLogIn />}>Login</MobileNavLink>
                                <Link to="/register" className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-700 font-semibold rounded-lg shadow hover:from-purple-600 hover:to-purple-800">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

const NavLink = ({ to, children, icon }) => (
    <Link to={to} className="text-gray-800 hover:text-purple-600 font-semibold flex items-center transition px-3 py-2 rounded-lg hover:bg-purple-50">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, icon, className = '' }) => (
    <Link to={to} className={`text-gray-800 hover:text-purple-600 font-medium flex items-center py-3 px-4 rounded-lg hover:bg-purple-50 ${className}`}>
        {icon && <span className="mr-3">{icon}</span>}
        {children}
    </Link>
);

const DropdownLink = ({ to, children, icon, className = '' }) => (
    <Link to={to} className={`flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 transition ${className}`}>
        {icon && <span className="mr-3">{icon}</span>}
        {children}
    </Link>
);

export default Header;
