import { useState } from 'react';

interface ScoreInputProps {
  value: number;
  maxScore: number;
  onChange: (value: number) => void;
}

export default function ScoreInput({ value, maxScore, onChange }: ScoreInputProps) {
  const [localValue, setLocalValue] = useState(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= maxScore) {
      onChange(numValue);
    }
  };

  const handleBlur = () => {
    const numValue = parseFloat(localValue);
    if (isNaN(numValue) || numValue < 0) {
      setLocalValue('0');
      onChange(0);
    } else if (numValue > maxScore) {
      setLocalValue(maxScore.toString());
      onChange(maxScore);
    }
  };

  return (
    <input
      type="number"
      min="0"
      max={maxScore}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-transparent"
    />
  );
}