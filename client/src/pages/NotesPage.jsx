

import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import noteService from '../services/noteService';
import { toast } from 'react-hot-toast';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const NoteCard = ({ note }) => {
  return (
    <article
      className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col border-2 border-black hover:border-[#6e48aa] transition-colors duration-200"
      aria-labelledby={`note-title-${note._id}`}
    >
      <Link
        to={`/notes/${note._id}`}
        className="flex-grow focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:ring-offset-2 rounded"
        aria-labelledby={`note-title-${note._id} note-desc-${note._id}`}
      >
        <div className="flex-grow">
          <p className="text-xs font-bold text-gray-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            <span className="sr-only">University and faculty: </span>
            {note.university} / {note.faculty}
          </p>
          <h3
            id={`note-title-${note._id}`}
            className="text-lg font-bold text-[#6e48aa] mt-2"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            {note.title}
          </h3>
          {note.description && (
            <p
              id={`note-desc-${note._id}`}
              className="text-sm text-gray-600 mt-2 line-clamp-2"
              aria-hidden={!note.description}
            >
              {note.description}
            </p>
          )}
        </div>
        <div className="mt-4 pt-2 border-t">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <dt className="sr-only">Subject</dt>
              <dd className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                <span aria-hidden="true">Subject: </span>
                <span className="font-bold">{note.subject}</span>
              </dd>
            </div>
            {note.semester && (
              <div>
                <dt className="sr-only">Semester</dt>
                <dd className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  <span aria-hidden="true">Semester: </span>
                  <span className="font-bold">{note.semester}</span>
                </dd>
              </div>
            )}
            {note.year && (
              <div className="col-span-2">
                <dt className="sr-only">Year</dt>
                <dd className="text-sm text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  <span aria-hidden="true">Year: </span>
                  <span className="font-bold">{note.year}</span>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Link>
    </article>
  );
};

const NotesPage = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    university: '',
    faculty: '',
    subject: '',
    semester: '',
    year: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef(null);
  const firstFilterRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.getNotes({ status: 'Approved' });
        setAllNotes(data);
      } catch (error) {
        toast.error("Could not fetch notes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    return {
      universities: [...new Set(allNotes.map(note => note.university))].sort(),
      faculties: [...new Set(allNotes.map(note => note.faculty))].sort(),
      subjects: [...new Set(allNotes.map(note => note.subject))].sort(),
      semesters: [...new Set(allNotes.map(note => note.semester).filter(Boolean))].sort(),
      years: [...new Set(allNotes.map(note => note.year).filter(Boolean))].sort((a, b) => b - a)
    };
  }, [allNotes]);

  // Filter notes based on search and filters
  const filteredNotes = useMemo(() => {
    return allNotes.filter(note => {
      // Search term matching (title, description, subject)
      const matchesSearch = searchTerm === '' ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.description && note.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter matching
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return note[key]?.toString().toLowerCase() === value.toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });
  }, [allNotes, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      university: '',
      faculty: '',
      subject: '',
      semester: '',
      year: ''
    });
    setSearchTerm('');
    setShowFilters(false);
    filterButtonRef.current?.focus();
  };

  useEffect(() => {
    if (showFilters && firstFilterRef.current) {
      firstFilterRef.current.focus();
    }
  }, [showFilters]);

  if (loading) return (
    <div className="text-center p-10" aria-live="polite" aria-busy="true">
      Loading notes...
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#6e48aa] mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        Notes Library
      </h1>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <p className="text-gray-600">
          Browse and search through our collection of study notes
        </p>
        <Link
          to="/notes/upload"
          className="w-full md:w-auto text-center px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#58cc02] focus:ring-offset-2"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          aria-label="Upload a new note"
        >
          + CONTRIBUTE NOTE
        </Link>
      </div>

      {/* Search and Filter Section */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">Notes search and filters</h2>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <label htmlFor="search-notes" className="sr-only">Search notes</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="search-notes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes by title, subject or description..."
              className="block w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:border-transparent"
              aria-describedby="search-notes-help"
            />
            <span id="search-notes-help" className="sr-only">
              Search will look in note titles, subjects and descriptions
            </span>
            <button
              ref={filterButtonRef}
              onClick={() => setShowFilters(!showFilters)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <FaFilter className="text-gray-400 hover:text-[#6e48aa]" />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div
              id="filter-panel"
              className="bg-white p-4 rounded-xl shadow-md border-2 border-gray-200"
              role="region"
              aria-labelledby="filter-panel-heading"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 id="filter-panel-heading" className="text-lg font-bold text-[#6e48aa]" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                  Filter Notes
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#6e48aa] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6e48aa] rounded px-2 py-1"
                  aria-label="Reset all filters"
                >
                  Reset All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label htmlFor="university-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <select
                    id="university-filter"
                    value={filters.university}
                    onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6e48aa]"
                    aria-label="Filter by university"
                    ref={firstFilterRef}
                  >
                    <option value="">All Universities</option>
                    {filterOptions.universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="faculty-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty
                  </label>
                  <select
                    id="faculty-filter"
                    value={filters.faculty}
                    onChange={(e) => setFilters({ ...filters, faculty: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6e48aa]"
                    aria-label="Filter by faculty"
                  >
                    <option value="">All Faculties</option>
                    {filterOptions.faculties.map(faculty => (
                      <option key={faculty} value={faculty}>{faculty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject-filter"
                    value={filters.subject}
                    onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6e48aa]"
                    aria-label="Filter by subject"
                  >
                    <option value="">All Subjects</option>
                    {filterOptions.subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    id="semester-filter"
                    value={filters.semester}
                    onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6e48aa]"
                    aria-label="Filter by semester"
                  >
                    <option value="">All Semesters</option>
                    {filterOptions.semesters.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    id="year-filter"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6e48aa]"
                    aria-label="Filter by year"
                  >
                    <option value="">All Years</option>
                    {filterOptions.years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active filters */}
              {(filters.university || filters.faculty || filters.subject || filters.semester || filters.year) && (
                <div className="mt-4">
                  <h4 className="sr-only">Active filters</h4>
                  <ul className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <li key={key}>
                          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <span className="capitalize">
                              <span className="sr-only">{key}: </span>
                              {value}
                            </span>
                            <button
                              onClick={() => setFilters({ ...filters, [key]: '' })}
                              className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
                              aria-label={`Remove ${key} filter for ${value}`}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results count */}
      <div className="mb-4" aria-live="polite" aria-atomic="true">
        <p className="text-gray-600" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
          Showing {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
          {(searchTerm || Object.values(filters).some(Boolean)) && (
            <button
              onClick={resetFilters}
              className="ml-2 text-[#6e48aa] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6e48aa] rounded px-1"
              aria-label="Clear all filters"
            >
              (Clear all)
            </button>
          )}
        </p>
      </div>

      {/* Notes Grid */}
      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading" className="sr-only">Notes</h2>

        {filteredNotes.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <li key={note._id}>
                <NoteCard note={note} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="col-span-full text-center py-10" aria-live="polite">
            <p className="text-gray-500 text-lg" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
              No notes found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#6e48aa] text-white rounded-lg hover:bg-[#5a3a8a] focus:outline-none focus:ring-2 focus:ring-[#6e48aa] focus:ring-offset-2"
              aria-label="Reset filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default NotesPage;


