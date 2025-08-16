// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateBookPage from './pages/CreateBookPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import EditBookPage from './pages/EditBookPage';
import MyListingsPage from './pages/MyListingsPage';
import ChatPage from './pages/ChatPage';
import UploadNotePage from './pages/UploadNotePage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import FloatingButton from './components/FloatingButton';
import NotesFromTopperPage from './pages/NotesFromTopperPage';
import AdminRoute from './components/AdminRoute';
import ManageNotesPage from './pages/admin/ManageNotesPage';
import GigListPage from './pages/GigListPage';
import GigDetailPage from './pages/GigDetailPage';
import CreateGigPage from './pages/CreateGigPage';
import EditProfilePage from './pages/EditProfilePage';


function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/create" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} />
        <Route path="/projects/:id/edit" element={<ProtectedRoute><EditProjectPage /></ProtectedRoute>} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/books/create" element={<ProtectedRoute><CreateBookPage /></ProtectedRoute>} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/books/:id/edit" element={<ProtectedRoute><EditBookPage /></ProtectedRoute>} />  
        <Route path="/my-listings" element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/notes/upload" element={<ProtectedRoute><UploadNotePage /></ProtectedRoute>} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/my-favorites" element={<ProtectedRoute><MyFavoritesPage /></ProtectedRoute>} />

        <Route path="/notes-from-toppers" element={<NotesFromTopperPage />} />
        <Route path="/admin/notes" element={<AdminRoute><ManageNotesPage /></AdminRoute>} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/gigs" element={<GigListPage />} />
        <Route path="/gigs/:id" element={<GigDetailPage />} />
        <Route path="/gigs/create" element={<ProtectedRoute><CreateGigPage /></ProtectedRoute>} />

        <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />



      </Routes>
      {/* <FloatingButton /> */}

    </>
  );
}
export default App;