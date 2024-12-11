interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export default function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
  return (
    <div className="flex justify-between mb-4">
      {Array(totalSteps).fill(null).map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 mx-1 rounded ${
            index <= currentStep ? 'bg-red-600' : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}