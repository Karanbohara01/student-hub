// const fs = require('fs/promises');
// const path = require('path');

// const readDataFile = async () => {
//   // Correctly point to the single data file
//   const filePath = path.join(__dirname, '..', 'data', 'academicData.json');
//   const data = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(data);
// };
// const getUniversities = async (req, res) => {
//   try {
//     const data = await readDataFile();
//     // Ensure we always return an array, even if data.universities is missing
//     const universities = Array.isArray(data?.universities) ? data.universities : [];
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error('Error in getUniversities:', error);
//     res.status(500).json([]); // Return empty array on error
//   }
// };

// // Similar pattern for other endpoints
// const getFaculties = async (req, res) => {
//   try {
//     const { university } = req.query;
//     if (!university) return res.status(400).json([]);

//     const data = await readDataFile();
//     const faculties = Object.keys(data.structure?.[university] || {});
//     res.status(200).json(Array.isArray(faculties) ? faculties : []);
//   } catch (error) {
//     console.error('Error in getFaculties:', error);
//     res.status(500).json([]);
//   }
// };

// const getPrograms = async (req, res) => {
//   try {
//     const { university, faculty } = req.query;
//     const data = await readDataFile();
//     const programs = Object.keys(data.structure[university]?.[faculty] || {});
//     res.status(200).json(programs);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getSemesters = async (req, res) => {
//   try {
//     const { university, faculty, program } = req.query;
//     const data = await readDataFile();
//     const semesters = Object.keys(data.structure[university]?.[faculty]?.[program] || {});
//     res.status(200).json(semesters);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getSubjects = async (req, res) => {
//   try {
//     const { university, faculty, program, semester } = req.query;
//     const data = await readDataFile();
//     const subjects = data.structure[university]?.[faculty]?.[program]?.[semester] || [];
//     res.status(200).json(subjects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// module.exports = {
//   getUniversities,
//   getFaculties,
//   getPrograms,
//   getSemesters,
//   getSubjects,
// };

const fs = require('fs/promises');
const path = require('path');

const readDataFile = async () => {
  const filePath = path.join(__dirname, '..', 'data', 'academicData.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const getUniversities = async (req, res) => {
  try {
    const data = await readDataFile();
    // Get university names as array from the top-level keys
    const universities = Object.keys(data);
    res.status(200).json(universities);
  } catch (error) {
    console.error('Error in getUniversities:', error);
    res.status(500).json([]);
  }
};

const getFaculties = async (req, res) => {
  try {
    const { university } = req.query;
    if (!university) return res.status(400).json([]);

    const data = await readDataFile();
    // Access faculties directly under university
    const faculties = Object.keys(data[university] || {});
    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error in getFaculties:', error);
    res.status(500).json([]);
  }
};

const getPrograms = async (req, res) => {
  try {
    const { university, faculty } = req.query;
    const data = await readDataFile();
    // Access programs under university → faculty
    const programs = Object.keys(data[university]?.[faculty] || {});
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSemesters = async (req, res) => {
  try {
    const { university, faculty, program } = req.query;
    const data = await readDataFile();
    // Access semesters under university → faculty → program
    const semesters = Object.keys(data[university]?.[faculty]?.[program] || {});
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSubjects = async (req, res) => {
  try {
    const { university, faculty, program, semester } = req.query;
    const data = await readDataFile();
    // Access subjects under university → faculty → program → semester
    const subjects = data[university]?.[faculty]?.[program]?.[semester] || [];
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUniversities,
  getFaculties,
  getPrograms,
  getSemesters,
  getSubjects,
};