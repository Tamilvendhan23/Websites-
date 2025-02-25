import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionChange: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionChange,
}: QuestionNavigationProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <Button
          key={i}
          onClick={() => onQuestionChange(i)}
          className={cn(
            'h-10 w-10',
            currentQuestion === i && 'bg-indigo-600 text-white',
            answeredQuestions.has(i) && 'bg-green-100 text-green-800',
            !answeredQuestions.has(i) && currentQuestion !== i && 'bg-gray-100 text-gray-800'
          )}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}