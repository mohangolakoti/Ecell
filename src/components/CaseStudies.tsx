import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const { getDocuments } = useFirestore('case-studies');

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const data = await getDocuments([]);
      setCaseStudies(data as CaseStudy[]);
    };
    fetchCaseStudies();
  }, []);

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-white flex justify-center">
      <div className="mx-auto w-1/2">
        <h1 className='font-bold text-3xl text-center py-4 font-Montserrat'>Case Studies</h1>
        <div className="flex justify-center">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedStudy(study)}
            >
              <div className="relative">
                <img
                  src={study.imageUrl}
                  alt={study.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 font-Roboto">{study.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2 font-OpenSans">{study.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center font-OpenSans">
                    <User className="h-4 w-4 mr-1" />
                    <span>{study.author}</span>
                  </div>
                  <div className="flex items-center font-OpenSans">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(study.publishedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <img
                src={selectedStudy.imageUrl}
                alt={selectedStudy.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{selectedStudy.title}</h2>
            <div className="flex items-center text-gray-300 mb-6">
              <User className="h-5 w-5 mr-2" />
              <span>{selectedStudy.author}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(selectedStudy.publishedDate).toLocaleDateString()}</span>
            </div>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedStudy.content }}
            />
            <button
              onClick={() => setSelectedStudy(null)}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}