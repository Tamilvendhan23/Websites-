import React from 'react';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExamControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function ExamControls({
  currentQuestion,
  totalQuestions,
  onNext,
  onPrevious,
  onSubmit,
}: ExamControlsProps) {
  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center space-x-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {currentQuestion === totalQuestions - 1 ? (
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Submit Exam
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}