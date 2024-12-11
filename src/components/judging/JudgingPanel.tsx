import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Award, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { JudgingCriterion } from '../../types/event';
import ScoreInput from './ScoreInput';
import TeamScoreCard from './TeamScoreCard';
import { useNotifications } from '../../contexts/NotificationContext';

interface Team {
  id: string;
  teamName: string;
  members: {
    name: string;
    email: string;
    department: string;
  }[];
}

interface JudgingPanelProps {
  eventId: string;
  teams?: Team[];
  criteria?: JudgingCriterion[];
}

export default function JudgingPanel({ eventId, teams = [], criteria = [] }: JudgingPanelProps) {
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const { updateDocument } = useFirestore('events');
  const { showNotification } = useNotifications();

  const handleScoreChange = (teamId: string, criterionId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || {}),
        [criterionId]: value,
      },
    }));
  };

  const calculateTotalScore = (teamId: string) => {
    const teamScores = scores[teamId] || {};
    return criteria.reduce((total, criterion) => {
      const score = teamScores[criterion.id] || 0;
      return total + score * criterion.weight;
    }, 0);
  };

  const saveScores = async () => {
    try {
      await updateDocument(eventId, {
        scores: Object.entries(scores).map(([teamId, teamScores]) => ({
          teamId,
          scores: teamScores,
          totalScore: calculateTotalScore(teamId),
        })),
      });
      showNotification('Scores saved successfully', 'success');
    } catch (error) {
      showNotification('Failed to save scores', 'error');
    }
  };

  if (!teams.length || !criteria.length) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No teams or criteria available for judging.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Award className="h-6 w-6 mr-2 text-red-600" />
          Judging Panel
        </h2>
        <button
          onClick={saveScores}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Scores
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              {criteria.map((criterion) => (
                <th
                  key={criterion.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {criterion.name} ({(criterion.weight * 100).toFixed(0)}%)
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.map((team) => (
              <motion.tr
                key={team.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <TeamScoreCard
                  team={team}
                  criteria={criteria}
                  scores={scores[team.id] || {}}
                  onScoreChange={(criterionId, value) => 
                    handleScoreChange(team.id, criterionId, value)
                  }
                  totalScore={calculateTotalScore(team.id)}
                />
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}