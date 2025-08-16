

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import userService from '../services/userService';
// import useAuthStore from '../store/authStore';
// import { toast } from 'react-hot-toast';
// import StarRating from '../components/StarRating';

// const ProfilePage = () => {
//     const [profileData, setProfileData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { id: userId } = useParams();
//     const { userInfo } = useAuthStore();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const data = await userService.getPublicProfile(userId);
//                 setProfileData(data);
//             } catch (error) {
//                 toast.error('Could not load profile.', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, [userId]);

//     if (loading) return <p className="text-center text-xl font-bold mt-10">Loading profile...</p>;
//     if (!profileData) return <p className="text-center text-xl font-bold mt-10">User not found.</p>;

//     const { user, notes, projects, reviews } = profileData;
//     const isOwnProfile = userInfo?._id === user._id;

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10 space-y-12" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//             {/* --- Profile Header --- */}
//             <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-3xl shadow-2xl border-4 border-[#6e48aa] hover:shadow-purple-300 transition-shadow duration-300">
//                 <img
//                     src={`${import.meta.env.VITE_BACKEND_URL}${user?.profilePicture}`}
//                     alt={user?.name}
//                     className="w-36 h-36 rounded-full border-4 border-black object-cover shadow-lg"
//                 />
//                 <div className="text-center md:text-left space-y-2">
//                     <h1 className="text-4xl font-extrabold text-[#6e48aa]">{user?.name} ({user?.university})</h1>
//                     <p className="text-md text-gray-600">{user.bio}</p>
//                     <div className="flex justify-center md:justify-start mt-2">
//                         <StarRating rating={user.rating} numReviews={user.numReviews} />
//                     </div>
//                 </div>
//                 <div className="md:ml-auto">
//                     {isOwnProfile ? (
//                         <Link to="/profile/edit" className="px-6 py-2 bg-purple-500 hover:bg-purple-700 transition-all text-white font-bold rounded-xl border-2 border-black shadow-md">
//                             ✏️ Edit My Profile
//                         </Link>
//                     ) : (
//                         <button className="px-6 py-2 bg-[#6e48aa] hover:bg-[#593988] transition-all text-white font-bold rounded-xl border-2 border-black shadow-md">
//                             💬 Message
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* --- Contributions Section --- */}
//             <div className="space-y-6">
//                 <h2 className="text-3xl font-extrabold text-[#6e48aa] border-b-4 border-[#6e48aa] inline-block pb-2">📚 Contributions</h2>
//                 <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-black space-y-6">
//                     <div>
//                         <h3 className="text-2xl font-bold mb-2">📝 Notes ({notes.length})</h3>
//                         <div className="space-y-1">
//                             {notes.length > 0 ? notes.map(note => (
//                                 <Link to={`/notes/${note._id}`} key={note._id} className="block text-[#6e48aa] hover:underline">
//                                     • {note.title}
//                                 </Link>
//                             )) : <p className="text-gray-500">No notes uploaded yet.</p>}
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="text-2xl font-bold mt-4 mb-2">💼 Projects ({projects.length})</h3>
//                         <div className="space-y-1">
//                             {projects.length > 0 ? projects.map(project => (
//                                 <Link to={`/projects/${project._id}`} key={project._id} className="block text-[#6e48aa] hover:underline">
//                                     • {project.title}
//                                 </Link>
//                             )) : <p className="text-gray-500">No projects added yet.</p>}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* --- Reviews Section --- */}
//             <div className="space-y-6">
//                 <h2 className="text-3xl font-extrabold text-[#6e48aa] border-b-4 border-[#6e48aa] inline-block pb-2">🌟 Reviews Received ({reviews.length})</h2>
//                 <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-black space-y-6">
//                     {reviews.length > 0 ? reviews.map(review => (
//                         <div key={review._id} className="border-b pb-4 last:border-none">
//                             <div className="flex items-center mb-1">
//                                 <img
//                                     src={`${import.meta.env.VITE_BACKEND_URL}${review?.user?.profilePicture}`}
//                                     alt={review?.user?.name}
//                                     className="w-8 h-8 rounded-full mr-2 border border-gray-300"
//                                 />
//                                 <p className="font-bold text-[#6e48aa]">{review?.user?.name}</p>
//                             </div>
//                             <StarRating rating={review.rating} />
//                             <p className="text-gray-700 mt-1">{review.comment}</p>
//                         </div>
//                     )) : (
//                         <p className="text-gray-500 italic">No reviews yet.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MessageSquareText, Pencil, MapPin, GraduationCap, Sparkles, FileText, FolderGit2, Star, CalendarDays, FileUp, Mail } from "lucide-react";
import userService from "../services/userService";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import StarRating from "../components/StarRating";


export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("notes");

    const { id: userId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useAuthStore();

    const isOwnProfile = useMemo(() => {
        return userInfo?._id && profileData?.user?._id && userInfo._id === profileData.user._id;
    }, [userInfo?._id, profileData?.user?._id]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await userService.getPublicProfile(userId);
                if (mounted) setProfileData(data);
            } catch (error) {
                console.error(error);
                toast.error("Could not load profile.");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [userId]);

    if (loading) return <ProfileSkeleton />;
    if (!profileData) return (
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-extrabold mb-2">User not found</h1>
            <p className="text-gray-600 mb-6">The profile you are looking for doesn't exist or may have been removed.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
                <Sparkles className="w-4 h-4" /> Go Home
            </Link>
        </div>
    );

    const { user, notes = [], projects = [], reviews = [] } = profileData;
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-purple-50 via-white to-purple-50/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden rounded-3xl shadow-xl border border-purple-100 bg-white/80 backdrop-blur p-6 sm:p-8"
                >
                    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(60%_60%_at_10%_10%,black,transparent)]">
                        <div className="absolute -top-8 -left-8 w-56 h-56 rounded-full bg-purple-200/60 blur-3xl" />
                        <div className="absolute -bottom-10 -right-6 w-64 h-64 rounded-full bg-fuchsia-200/50 blur-3xl" />
                    </div>

                    <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                        <div className="shrink-0">
                            <div className="relative">
                                <img
                                    src={`${BACKEND_URL}${user?.profilePicture}`}
                                    alt={user?.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg ring-2 ring-purple-200"
                                />
                                <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white shadow">
                                    <Star className="w-3 h-3" /> {Number(user?.rating || 0).toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-700">
                                        {user?.name}
                                    </h1>
                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                                        {user?.university && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                                                <GraduationCap className="w-4 h-4" /> {user.university}
                                            </span>
                                        )}
                                        {user?.location && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">
                                                <MapPin className="w-4 h-4" /> {user.location}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                            <Star className="w-4 h-4" /> {user?.numReviews || 0} reviews
                                        </span>
                                    </div>

                                    {user?.bio && (
                                        <p className="mt-3 max-w-3xl text-gray-700 leading-relaxed">{user.bio}</p>
                                    )}

                                    <div className="mt-3">
                                        <StarRating rating={user?.rating} numReviews={user?.numReviews} />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {isOwnProfile ? (
                                        <Link
                                            to="/profile/edit"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-purple-600 text-white shadow hover:bg-purple-700 active:scale-[0.99] border border-purple-700/30"
                                        >
                                            <Pencil className="w-4 h-4" /> Edit Profile
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => navigate(`/messages/${user?._id}`)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-purple-600 text-white shadow hover:bg-purple-700 active:scale-[0.99] border border-purple-700/30"
                                            >
                                                <MessageSquareText className="w-4 h-4" /> Message
                                            </button>
                                            <a
                                                href={`mailto:${user?.email ?? ""}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                                            >
                                                <Mail className="w-4 h-4" /> Email
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard icon={FileText} label="Notes" value={notes.length} />
                    <StatCard icon={FolderGit2} label="Projects" value={projects.length} />
                    <StatCard icon={Star} label="Reviews" value={reviews.length} />
                </div>

                {/* Tabs */}
                <div className="mt-10">
                    <div className="flex items-center gap-2 bg-white rounded-2xl border shadow-sm p-1">
                        <TabButton active={activeTab === "notes"} onClick={() => setActiveTab("notes")} icon={FileText}>
                            Notes
                        </TabButton>
                        <TabButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")} icon={FolderGit2}>
                            Projects
                        </TabButton>
                        <TabButton active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} icon={Star}>
                            Reviews
                        </TabButton>
                    </div>

                    {/* Panels */}
                    <div className="mt-6">
                        {activeTab === "notes" && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                {notes.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {notes.map((note) => (
                                            <Link key={note._id} to={`/notes/${note._id}`} className="group">
                                                <div className="h-full rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold group-hover:underline line-clamp-2">{note.title}</h3>
                                                            {note?.subject && <p className="text-sm text-gray-500 mt-0.5">{note.subject}</p>}
                                                        </div>
                                                    </div>
                                                    {note?.createdAt && (
                                                        <p className="mt-4 text-xs text-gray-500 inline-flex items-center gap-1">
                                                            <CalendarDays className="w-4 h-4" /> {new Date(note.createdAt).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        title="No notes yet"
                                        subtitle="When this user uploads study notes, they'll appear here."
                                        cta={isOwnProfile ? { label: "Upload Notes", to: "/notes/upload", icon: FileUp } : undefined}
                                    />
                                )}
                            </motion.div>
                        )}

                        {activeTab === "projects" && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                {projects.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {projects.map((project) => (
                                            <Link key={project._id} to={`/projects/${project._id}`} className="group">
                                                <div className="h-full rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                                                            <FolderGit2 className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold group-hover:underline line-clamp-2">{project.title}</h3>
                                                            {project?.tech && (
                                                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{Array.isArray(project.tech) ? project.tech.join(", ") : project.tech}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {project?.createdAt && (
                                                        <p className="mt-4 text-xs text-gray-500 inline-flex items-center gap-1">
                                                            <CalendarDays className="w-4 h-4" /> {new Date(project.createdAt).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        title="No projects yet"
                                        subtitle="Once projects are added, they'll show up here."
                                        cta={isOwnProfile ? { label: "Add Project", to: "/projects/new", icon: Sparkles } : undefined}
                                    />
                                )}
                            </motion.div>
                        )}

                        {activeTab === "reviews" && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                {reviews.length > 0 ? (
                                    <div className="rounded-2xl border bg-white divide-y">
                                        {reviews.map((review) => (
                                            <div key={review._id} className="p-4 sm:p-5 flex gap-3">
                                                <img
                                                    src={`${BACKEND_URL}${review?.user?.profilePicture}`}
                                                    alt={review?.user?.name}
                                                    className="w-10 h-10 rounded-full border"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold text-gray-900">{review?.user?.name}</p>
                                                        <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                                            <StarRating rating={review.rating} />
                                                        </span>
                                                    </div>
                                                    {review?.comment && <p className="mt-1 text-gray-700">{review.comment}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        title="No reviews yet"
                                        subtitle="This user hasn't received any reviews."
                                        cta={!isOwnProfile ? { label: "Leave a Review", to: `/reviews/new?user=${user?._id}`, icon: Star } : undefined}
                                    />
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


// eslint-disable-next-line no-unused-vars
function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm">
            <div className="absolute -top-8 -right-6 w-28 h-28 rounded-full bg-purple-50 blur-2xl" />
            <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                    <Icon className="w-5 h-5" />
                </span>
                <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-extrabold">{value}</p>
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, children }) {
    return (
        <button
            onClick={onClick}
            className={[
                "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition border",
                active
                    ? "bg-purple-600 text-white border-purple-700/40 shadow"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200",
            ].join(" ")}
        >
            {Icon && <Icon className="w-4 h-4" />} {children}
        </button>
    );
}

function EmptyState({ title, subtitle, cta }) {
    return (
        <div className="text-center bg-white border rounded-2xl p-10">
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600 mt-1">{subtitle}</p>
            {cta && (
                <Link
                    to={cta.to}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 border border-purple-700/30"
                >
                    {cta.icon ? <cta.icon className="w-4 h-4" /> : null}
                    {cta.label}
                </Link>
            )}
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
            <div className="rounded-3xl border bg-white p-8 shadow">
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-2xl bg-gray-200" />
                    <div className="flex-1 space-y-3">
                        <div className="w-2/3 h-8 bg-gray-200 rounded" />
                        <div className="w-3/5 h-4 bg-gray-200 rounded" />
                        <div className="w-1/2 h-4 bg-gray-200 rounded" />
                    </div>
                    <div className="w-28 h-10 bg-gray-200 rounded-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="h-24 bg-white border rounded-2xl" />
                <div className="h-24 bg-white border rounded-2xl" />
                <div className="h-24 bg-white border rounded-2xl" />
            </div>

            <div className="mt-8 bg-white border rounded-2xl h-56" />
        </div>
    );
}


