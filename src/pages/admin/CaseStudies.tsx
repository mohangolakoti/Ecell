import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
  author: string;
}

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudy, setCurrentStudy] = useState<Partial<CaseStudy>>({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    author: '',
  });

  const { getDocuments, addDocument, updateDocument, deleteDocument } = useFirestore('case-studies');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    const data = await getDocuments([]);
    setCaseStudies(data as CaseStudy[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStudy.id) {
      await updateDocument(currentStudy.id, {
        ...currentStudy,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await addDocument({
        ...currentStudy,
        publishedDate: new Date().toISOString(),
      });
    }
    setIsEditing(false);
    setCurrentStudy({
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      author: '',
    });
    fetchCaseStudies();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      await deleteDocument(id);
      fetchCaseStudies();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Case Studies</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Case Study
        </button>
      </div>

      {isEditing && (
        <div className="mb-8 bg-white/10 backdrop-blur-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">Title</label>
              <input
                type="text"
                value={currentStudy.title}
                onChange={(e) => setCurrentStudy({ ...currentStudy, title: e.target.value })}
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Summary</label>
              <textarea
                value={currentStudy.summary}
                onChange={(e) => setCurrentStudy({ ...currentStudy, summary: e.target.value })}
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Content</label>
              <div className="mt-1 bg-white rounded-md">
                <ReactQuill
                  value={currentStudy.content}
                  onChange={(content) => setCurrentStudy({ ...currentStudy, content })}
                  theme="snow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Cover Image URL</label>
              <input
                type="url"
                value={currentStudy.imageUrl}
                onChange={(e) => setCurrentStudy({ ...currentStudy, imageUrl: e.target.value })}
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Author</label>
              <input
                type="text"
                value={currentStudy.author}
                onChange={(e) => setCurrentStudy({ ...currentStudy, author: e.target.value })}
                className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentStudy({
                    title: '',
                    summary: '',
                    content: '',
                    imageUrl: '',
                    author: '',
                  });
                }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {currentStudy.id ? 'Update' : 'Publish'} Case Study
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <div key={study.id} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
            <img
              src={study.imageUrl}
              alt={study.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{study.title}</h3>
              <p className="text-gray-300 mt-2">{study.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  By {study.author} • {new Date(study.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentStudy(study);
                      setIsEditing(true);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}