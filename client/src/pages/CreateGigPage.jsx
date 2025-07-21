// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import gigService from '../services/gigService';
// import { toast } from 'react-hot-toast';

// const CreateGigPage = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     subject: '',
//     budget: '',
//     deadline: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await gigService.createGig(formData);
//       toast.success('Gig posted successfully!');
//       navigate('/gigs');
//     } catch (error) {
//       toast.error('Failed to post gig.', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
//       <div className="bg-white p-8 rounded-3xl shadow-lg border-4 border-black">
//         <h1 className="text-3xl font-bold text-center text-[#6e48aa] mb-6">Post a New Gig</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input name="title" type="text" placeholder="Title (e.g., 'Need a website designed')" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           <textarea name="description" placeholder="Describe the work required..." value={formData.description} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           <input name="subject" type="text" placeholder="Subject (e.g., 'Web Design')" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           <div className="flex gap-4">
//             <input name="budget" type="number" placeholder="Budget (Rs.)" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//             <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
//           </div>
//           <button type="submit" className="w-full py-3 font-bold text-white bg-[#6e48aa] rounded-xl border-2 border-black hover:bg-[#5a3a8a]">
//             POST GIG
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateGigPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gigService from '../services/gigService';
import { toast } from 'react-hot-toast';
import Dropzone from '../components/Dropzone'; // <-- Import the new component

const CreateGigPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    budget: '',
    deadline: '',
  });
  const [gigFile, setGigFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gigFile && !formData.description) {
      return toast.error('Please provide a description or upload a file.');
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (gigFile) {
      data.append('gigFile', gigFile);
    }

    try {
      await gigService.createGig(data);
      toast.success('Gig posted successfully!');
      navigate('/gigs');
    } catch (error) {
      toast.error('Failed to post gig.', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <div className="bg-white p-8 rounded-3xl shadow-lg border-4 border-black">
        <h1 className="text-3xl font-bold text-center text-[#6e48aa] mb-6">Post a New Gig</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="title" type="text" placeholder="Title (e.g., 'Need a website designed')" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          <textarea name="description" placeholder="Write a brief description..." value={formData.description} onChange={handleChange} rows="5" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          <input name="subject" type="text" placeholder="Subject (e.g., 'Web Design')" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          <div className="flex gap-4">
            <input name="budget" type="number" placeholder="Budget (Rs.)" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
            <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl" />
          </div>

          {/* --- New Dropzone Section --- */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Details File (Optional)</label>
            <Dropzone onFileAccepted={(file) => setGigFile(file)} />
            {gigFile && <p className="text-sm text-purple-600 mt-2">File selected: {gigFile.name}</p>}
          </div>

          <button type="submit" className="w-full py-3 font-bold text-white bg-[#6e48aa] rounded-xl border-2 border-black hover:bg-[#5a3a8a]">
            POST GIG
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGigPage;