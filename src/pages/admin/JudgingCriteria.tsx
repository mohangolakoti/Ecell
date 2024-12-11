import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface Criterion {
  id: string;
  name: string;
  maxScore: number;
  weight: number;
}

export default function JudgingCriteria() {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [newCriterion, setNewCriterion] = useState({
    name: '',
    maxScore: 10,
    weight: 1,
  });

  const { getDocuments, addDocument, updateDocument, deleteDocument } = useFirestore('judging-criteria');

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    const data = await getDocuments([]);
    setCriteria(data as Criterion[]);
  };

  const handleAdd = async () => {
    await addDocument(newCriterion);
    setNewCriterion({ name: '', maxScore: 10, weight: 1 });
    fetchCriteria();
  };

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    fetchCriteria();
  };

  const handleUpdate = async (id: string, updates: Partial<Criterion>) => {
    await updateDocument(id, updates);
    fetchCriteria();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Judging Criteria</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Add New Criterion</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Name</label>
            <input
              type="text"
              value={newCriterion.name}
              onChange={(e) => setNewCriterion({ ...newCriterion, name: e.target.value })}
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Max Score</label>
            <input
              type="number"
              value={newCriterion.maxScore}
              onChange={(e) => setNewCriterion({ ...newCriterion, maxScore: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Weight</label>
            <input
              type="number"
              step="0.1"
              value={newCriterion.weight}
              onChange={(e) => setNewCriterion({ ...newCriterion, weight: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md bg-white/5 border border-gray-600 text-white p-2"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Criterion
        </button>
      </motion.div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Criterion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Max Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {criteria.map((criterion) => (
              <motion.tr
                key={criterion.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={(e) => handleUpdate(criterion.id, { name: e.target.value })}
                    className="bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-1"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={criterion.maxScore}
                    onChange={(e) => handleUpdate(criterion.id, { maxScore: parseInt(e.target.value) })}
                    className="bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-1 w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    step="0.1"
                    value={criterion.weight}
                    onChange={(e) => handleUpdate(criterion.id, { weight: parseFloat(e.target.value) })}
                    className="bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-1 w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(criterion.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}