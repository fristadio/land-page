import { Check } from "lucide-react";

interface MultiStepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function MultiStepProgress({ currentStep, totalSteps, stepLabels }: MultiStepProgressProps) {
  return (
    <div className="w-full mb-6">
      {/* Tabs navigation */}
      <div className="flex border-b border-border">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`
                flex-1 pb-3 px-2 text-center relative transition-all
                ${isCurrent ? 'border-b-2 border-primary' : ''}
              `}
            >
              <div className="flex items-center justify-center gap-2">
                {/* Number or Check */}
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    transition-all
                    ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                    ${isCurrent ? 'bg-primary text-primary-foreground' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                
                {/* Label */}
                <span 
                  className={`
                    text-sm font-medium hidden sm:inline
                    ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}
                  `}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

