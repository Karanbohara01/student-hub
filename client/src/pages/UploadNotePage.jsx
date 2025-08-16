

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';

const UploadNotePage = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    university: '',
    faculty: '',
    program: '',
    semester: '',
    subject: '',
    tags: '',
  });

  // File and loading states
  const [noteFile, setNoteFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dropdown data and loading states
  const [dropdownData, setDropdownData] = useState({
    universities: [],
    faculties: [],
    programs: [],
    semesters: [],
    subjects: [],
  });

  const [loadingStates, setLoadingStates] = useState({
    universities: false,
    faculties: false,
    programs: false,
    semesters: false,
    subjects: false,
  });

  const navigate = useNavigate();

  // Helper function to safely parse API responses
  const safeParseArray = (data) => {
    try {
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Data parsing error:', error);
      return [];
    }
  };

  // Fetch universities on component mount
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoadingStates(prev => ({ ...prev, universities: true }));
      try {
        const response = await axios.get('/api/data/universities');
        const universities = safeParseArray(response.data);
        setDropdownData(prev => ({ ...prev, universities }));
      } catch (error) {
        console.error('University fetch error:', error);
        toast.error('Failed to load universities');
        setDropdownData(prev => ({ ...prev, universities: [] }));
      } finally {
        setLoadingStates(prev => ({ ...prev, universities: false }));
      }
    };
    fetchUniversities();
  }, []);

  // Fetch faculties when university changes
  useEffect(() => {
    if (!formData.university) return;

    const fetchFaculties = async () => {
      setLoadingStates(prev => ({ ...prev, faculties: true }));
      try {
        // Reset downstream selections
        setFormData(prev => ({
          ...prev,
          faculty: '',
          program: '',
          semester: '',
          subject: ''
        }));

        const response = await axios.get(
          `/api/data/faculties?university=${encodeURIComponent(formData.university)}`
        );

        const faculties = safeParseArray(response.data);
        setDropdownData(prev => ({
          ...prev,
          faculties,
          programs: [],
          semesters: [],
          subjects: []
        }));
      } catch (error) {
        console.error('Faculty fetch error:', error);
        toast.error('Failed to load faculties');
        setDropdownData(prev => ({ ...prev, faculties: [] }));
      } finally {
        setLoadingStates(prev => ({ ...prev, faculties: false }));
      }
    };

    fetchFaculties();
  }, [formData.university]);

  // Fetch programs when faculty changes
  useEffect(() => {
    if (!formData.faculty) return;

    const fetchPrograms = async () => {
      setLoadingStates(prev => ({ ...prev, programs: true }));
      try {
        // Reset downstream selections
        setFormData(prev => ({
          ...prev,
          program: '',
          semester: '',
          subject: ''
        }));

        const response = await axios.get(
          `/api/data/programs?university=${encodeURIComponent(formData.university)}&faculty=${encodeURIComponent(formData.faculty)}`
        );

        const programs = safeParseArray(response.data);
        setDropdownData(prev => ({
          ...prev,
          programs,
          semesters: [],
          subjects: []
        }));
      } catch (error) {
        console.error('Program fetch error:', error);
        toast.error('Failed to load programs');
        setDropdownData(prev => ({ ...prev, programs: [] }));
      } finally {
        setLoadingStates(prev => ({ ...prev, programs: false }));
      }
    };

    fetchPrograms();
  }, [formData.faculty]);

  // Fetch semesters when program changes
  useEffect(() => {
    if (!formData.program) return;

    const fetchSemesters = async () => {
      setLoadingStates(prev => ({ ...prev, semesters: true }));
      try {
        // Reset downstream selections
        setFormData(prev => ({
          ...prev,
          semester: '',
          subject: ''
        }));

        const response = await axios.get(
          `/api/data/semesters?university=${encodeURIComponent(formData.university)}&faculty=${encodeURIComponent(formData.faculty)}&program=${encodeURIComponent(formData.program)}`
        );

        const semesters = safeParseArray(response.data);
        setDropdownData(prev => ({
          ...prev,
          semesters,
          subjects: []
        }));
      } catch (error) {
        console.error('Semester fetch error:', error);
        toast.error('Failed to load semesters');
        setDropdownData(prev => ({ ...prev, semesters: [] }));
      } finally {
        setLoadingStates(prev => ({ ...prev, semesters: false }));
      }
    };

    fetchSemesters();
  }, [formData.program]);

  // Fetch subjects when semester changes
  useEffect(() => {
    if (!formData.semester) return;

    const fetchSubjects = async () => {
      setLoadingStates(prev => ({ ...prev, subjects: true }));
      try {
        setFormData(prev => ({ ...prev, subject: '' }));

        const response = await axios.get(
          `/api/data/subjects?university=${encodeURIComponent(formData.university)}&faculty=${encodeURIComponent(formData.faculty)}&program=${encodeURIComponent(formData.program)}&semester=${encodeURIComponent(formData.semester)}`
        );

        const subjects = safeParseArray(response.data);
        setDropdownData(prev => ({ ...prev, subjects }));
      } catch (error) {
        console.error('Subject fetch error:', error);
        toast.error('Failed to load subjects');
        setDropdownData(prev => ({ ...prev, subjects: [] }));
      } finally {
        setLoadingStates(prev => ({ ...prev, subjects: false }));
      }
    };

    fetchSubjects();
  }, [formData.semester]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain'];

    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PDF, DOC, DOCX, PPT, PPTX, or TXT files.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setNoteFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!noteFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!formData.title || !formData.university || !formData.faculty ||
      !formData.program || !formData.semester || !formData.subject) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      // Append the file
      formDataToSend.append('noteFile', noteFile);

      // Submit to API
      await noteService.createNote(formDataToSend);

      // Success feedback and navigation
      toast.success('Note uploaded successfully! It will be reviewed soon.');
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Failed to upload note';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Form styling
  const formStyle = "w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const buttonStyle = "w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center";

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-purple-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Share Your Knowledge</h1>
          <p className="opacity-90">Upload your study notes and help fellow students</p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Note Title */}
          <div>
            <label className={labelStyle}>Note Title*</label>
            <input
              name="title"
              type="text"
              placeholder="e.g., Calculus II Final Exam Notes"
              onChange={handleChange}
              value={formData.title}
              required
              className={formStyle}
            />
          </div>

          {/* University Dropdown */}
          <div>
            <label className={labelStyle}>University/Category*</label>
            <select
              name="university"
              onChange={handleChange}
              value={formData.university}
              required
              disabled={loadingStates.universities}
              className={formStyle}
            >
              <option value="">-- Select --</option>
              {loadingStates.universities ? (
                <option disabled>Loading universities...</option>
              ) : (
                dropdownData.universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))
              )}
              {!loadingStates.universities && dropdownData.universities.length === 0 && (
                <option disabled>No universities available</option>
              )}
            </select>
          </div>

          {/* Faculty Dropdown */}
          <div>
            <label className={labelStyle}>Faculty*</label>
            <select
              name="faculty"
              onChange={handleChange}
              value={formData.faculty}
              required
              disabled={!formData.university || loadingStates.faculties}
              className={formStyle}
            >
              <option value="">-- Select --</option>
              {loadingStates.faculties ? (
                <option disabled>Loading faculties...</option>
              ) : (
                dropdownData.faculties.map(fac => (
                  <option key={fac} value={fac}>{fac}</option>
                ))
              )}
              {!loadingStates.faculties && dropdownData.faculties.length === 0 && formData.university && (
                <option disabled>No faculties available for this university</option>
              )}
            </select>
          </div>

          {/* Program Dropdown */}
          <div>
            <label className={labelStyle}>Program*</label>
            <select
              name="program"
              onChange={handleChange}
              value={formData.program}
              required
              disabled={!formData.faculty || loadingStates.programs}
              className={formStyle}
            >
              <option value="">-- Select --</option>
              {loadingStates.programs ? (
                <option disabled>Loading programs...</option>
              ) : (
                dropdownData.programs.map(prog => (
                  <option key={prog} value={prog}>{prog}</option>
                ))
              )}
              {!loadingStates.programs && dropdownData.programs.length === 0 && formData.faculty && (
                <option disabled>No programs available for this faculty</option>
              )}
            </select>
          </div>

          {/* Semester and Subject Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Semester Dropdown */}
            <div>
              <label className={labelStyle}>Semester/Year*</label>
              <select
                name="semester"
                onChange={handleChange}
                value={formData.semester}
                required
                disabled={!formData.program || loadingStates.semesters}
                className={formStyle}
              >
                <option value="">-- Select --</option>
                {loadingStates.semesters ? (
                  <option disabled>Loading semesters...</option>
                ) : (
                  dropdownData.semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))
                )}
                {!loadingStates.semesters && dropdownData.semesters.length === 0 && formData.program && (
                  <option disabled>No semesters available for this program</option>
                )}
              </select>
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className={labelStyle}>Subject*</label>
              <select
                name="subject"
                onChange={handleChange}
                value={formData.subject}
                required
                disabled={!formData.semester || loadingStates.subjects}
                className={formStyle}
              >
                <option value="">-- Select --</option>
                {loadingStates.subjects ? (
                  <option disabled>Loading subjects...</option>
                ) : (
                  dropdownData.subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))
                )}
                {!loadingStates.subjects && dropdownData.subjects.length === 0 && formData.semester && (
                  <option disabled>No subjects available for this semester</option>
                )}
              </select>
            </div>
          </div>

          {/* Tags Input */}
          <div>
            <label className={labelStyle}>Tags</label>
            <input
              name="tags"
              type="text"
              placeholder="e.g., exam-notes, important, chapter-5"
              onChange={handleChange}
              value={formData.tags}
              className={formStyle}
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma-separated keywords to help others find your note
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className={labelStyle}>Note File*</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                name="noteFile"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
              {noteFile && (
                <span className="text-sm text-gray-600 truncate max-w-xs">
                  {noteFile.name}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC, DOCX, PPT, PPTX, or TXT (Max 10MB)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={buttonStyle}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : 'Upload Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNotePage;