import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaBook, FaProjectDiagram, FaClipboardList, FaComments, FaCheckCircle, FaUsers } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, link }) => (
    <Link to={link || '#'} className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-black hover:border-[#6e48aa]">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
            {icon}
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{title}</h2>
        <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{description}</p>
    </Link>
);

const HomePage = () => {
    const { userInfo } = useAuthStore();

    return (
        <>
            {userInfo ? (
                <div className="w-full px-4 mt-10 md:px-8">
                    {/* Welcome Heading */}
                    <div className="text-center mb-10">
                        <h1
                            className="text-4xl md:text-5xl font-bold text-purple-500"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        >
                            Welcome back, {userInfo.name}! 👋
                        </h1>
                        <p
                            className="text-lg md:text-xl text-gray-600 mt-2"
                            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        >
                            Let's get started. What would you like to do today?
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 text-purple-500 sm:grid-cols-2   lg:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={<FaProjectDiagram size={28} />}
                            title="Projects"
                            description="Browse and share course projects."
                            link="/projects"
                        />
                        <FeatureCard
                            icon={<FaBook size={28} />}
                            title="Book Exchange"
                            description="Buy, sell, or exchange textbooks."
                            link="/books"
                        />
                        <FeatureCard
                            icon={<FaClipboardList size={28} />}
                            title="Notes Library"
                            description="Find and contribute study notes."
                            link="/notes"
                        />
                        <FeatureCard
                            icon={<FaComments size={28} />}
                            title="My Messages"
                            description="Check your ongoing conversations."
                            link="/chat"
                        />
                    </div>
                </div>
            ) : (
                // --- LANDING PAGE VIEW (Guests) ---
                <div className="font-sans">
                    {/* Hero Section */}
                    <section className="text-center py-20 bg-white m-8 rounded-xl border-4 border-black p-40">
                        <h1 className="text-5xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            The Ultimate Hub for Students
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto my-6" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Access projects, share notes, exchange books, and collaborate with peers from across Nepal.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/register" className="px-8 py-3 font-bold text-white bg-purple-500 rounded-xl hover:bg-purple-700 shadow-md border-2 border-black text-lg" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                GET STARTED - IT'S FREE
                            </Link>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 ">
                        <h2 className="text-3xl m-8 font-bold text-  mb-8" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Everything a Student Needs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <FaProjectDiagram size={48} className="mx-auto text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Project Marketplace</h3>
                                <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Buy and sell final year projects, assignments, and code.</p>
                            </div>
                            <div className="text-center p-6">
                                <FaBook size={48} className="mx-auto text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Notes Library</h3>
                                <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Access a vast, categorized library of notes from Class 10 to Masters.</p>
                            </div>
                            <div className="text-center p-6">
                                <FaUsers size={48} className="mx-auto text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Real-time Collaboration</h3>
                                <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Chat with peers, get help with assignments, and share ideas instantly.</p>
                            </div>
                        </div>
                    </section>

                    {/* Final Call to Action */}
                    <section className="text-center m-8 py-20 bg-white rounded-3xl border-4 border-black p-4">
                        <h2 className="text-3xl font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto my-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            Join thousands of students and unlock a world of academic resources.
                        </p>
                        <Link to="/register" className="px-8 py-3 font-bold text-white bg-purple-500 rounded-xl hover:bg-purple-700 shadow-md border-2 border-black text-lg" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            SIGN UP NOW
                        </Link>
                    </section>
                </div>
            )}
        </>
    );
};

export default HomePage;