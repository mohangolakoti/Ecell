import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Award, Save } from 'lucide-react';

interface JudgingCriteria {
  id: string;
  name: string;
  maxScore: number;
  weight: number;
}

interface Team {
  id: string;
  teamName: string;
  members: {
    name: string;
    email: string;
    department: string;
  }[];
}

export default function JudgingPanel({ eventId, teams }: { eventId: string; teams: Team[] }) {
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const { updateDocument } = useFirestore('events');

  const criteria: JudgingCriteria[] = [
    { id: 'innovation', name: 'Innovation', maxScore: 10, weight: 0.3 },
    { id: 'execution', name: 'Execution', maxScore: 10, weight: 0.3 },
    { id: 'presentation', name: 'Presentation', maxScore: 10, weight: 0.2 },
    { id: 'feasibility', name: 'Feasibility', maxScore: 10, weight: 0.2 },
  ];

  const handleScoreChange = (teamId: string, criteriaId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || {}),
        [criteriaId]: value,
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
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Award className="h-6 w-6 mr-2" />
          Judging Panel
        </h2>
        <button
          onClick={saveScores}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Scores
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Team
              </th>
              {criteria.map((criterion) => (
                <th
                  key={criterion.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {criterion.name} ({criterion.weight * 100}%)
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {teams.map((team) => (
              <tr key={team.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">{team.teamName}</div>
                    <div className="text-sm text-gray-400">
                      {team.members.length} members
                    </div>
                  </div>
                </td>
                {criteria.map((criterion) => (
                  <td key={criterion.id} className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max={criterion.maxScore}
                      value={scores[team.id]?.[criterion.id] || ''}
                      onChange={(e) => handleScoreChange(
                        team.id,
                        criterion.id,
                        Math.min(criterion.maxScore, Math.max(0, parseInt(e.target.value) || 0))
                      )}
                      className="w-20 px-2 py-1 bg-white/5 border border-gray-600 rounded text-white"
                    />
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">
                  {calculateTotalScore(team.id).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}