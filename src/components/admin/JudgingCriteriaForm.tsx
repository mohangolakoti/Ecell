import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Plus, Save, Info, Trash2 } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { DEFAULT_JUDGING_CRITERIA } from '../../lib/constants/judgingCriteria';

interface CriteriaFormProps {
  eventId: string;
  onSave: () => void;
}

interface Criterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
}

export default function JudgingCriteriaForm({ eventId, onSave }: CriteriaFormProps) {
  const [criteria, setCriteria] = useState<Criterion[]>(DEFAULT_JUDGING_CRITERIA);
  const { updateDocument } = useFirestore('events');
  const { showNotification } = useNotifications();

  const addCriterion = () => {
    setCriteria([...criteria, {
      id: `criterion-${criteria.length + 1}`,
      name: '',
      description: '',
      maxScore: 10,
      weight: 0.1
    }]);
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateCriterion = (index: number, field: keyof Criterion, value: string | number) => {
    const newCriteria = [...criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setCriteria(newCriteria);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!criteria.every(c => c.name)) {
      showNotification('Please fill in all criteria names', 'error');
      return;
    }

    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      showNotification('Total weights must sum to 1.0', 'error');
      return;
    }

    try {
      await updateDocument(eventId, { judgingCriteria: criteria });
      showNotification('Judging criteria saved successfully', 'success');
      onSave();
    } catch (error) {
      showNotification('Failed to save judging criteria', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card-dark p-4 mb-6">
        <div className="flex items-center text-white mb-2">
          <Info className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="text-lg font-semibold">Judging Criteria Guidelines</h3>
        </div>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>Each criterion should have a unique name and clear description</li>
          <li>Maximum score for each criterion is 10 points</li>
          <li>Weights must sum to 1.0 (100%)</li>
          <li>Consider both technical and non-technical aspects</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {criteria.map((criterion, index) => (
          <div key={criterion.id} className="glass-card-dark p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  placeholder="Criterion Name"
                  value={criterion.name}
                  onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                  className="input-primary bg-glass-dark text-white w-full mb-2"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={criterion.description}
                  onChange={(e) => updateCriterion(index, 'description', e.target.value)}
                  className="input-primary bg-glass-dark text-white w-full h-20"
                  required
                />
              </div>
              {criteria.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCriterion(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Maximum Score
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={criterion.maxScore}
                  onChange={(e) => updateCriterion(index, 'maxScore', parseInt(e.target.value))}
                  className="input-primary bg-glass-dark text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Weight (0-1)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={criterion.weight}
                  onChange={(e) => updateCriterion(index, 'weight', parseFloat(e.target.value))}
                  className="input-primary bg-glass-dark text-white"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addCriterion}
            className="flex items-center px-4 py-2 bg-red-600/50 text-white rounded-md hover:bg-red-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Criterion
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Criteria
          </button>
        </div>
      </form>
    </div>
  );
}