import { JudgingCriterion } from '../../types/event';
import ScoreInput from './ScoreInput';

interface TeamScoreCardProps {
  team: {
    teamName: string;
    members: { name: string }[];
  };
  criteria: JudgingCriterion[];
  scores: Record<string, number>;
  onScoreChange: (criterionId: string, value: number) => void;
  totalScore: number;
}

export default function TeamScoreCard({
  team,
  criteria,
  scores,
  onScoreChange,
  totalScore
}: TeamScoreCardProps) {
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
          <div className="text-sm text-gray-500">
            {team.members.length} members
          </div>
        </div>
      </td>
      {criteria.map((criterion) => (
        <td key={criterion.id} className="px-6 py-4 whitespace-nowrap">
          <ScoreInput
            value={scores[criterion.id] || 0}
            maxScore={criterion.maxScore}
            onChange={(value) => onScoreChange(criterion.id, value)}
          />
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
        {totalScore.toFixed(2)}
      </td>
    </>
  );
}