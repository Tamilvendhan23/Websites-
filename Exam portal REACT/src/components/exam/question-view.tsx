import React from 'react';
import { Question } from '../../types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface QuestionViewProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export function QuestionView({ question, userAnswer, onAnswerChange }: QuestionViewProps) {
  if (question.type === 'mcq') {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-900">{question.text}</p>
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={userAnswer === option}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="h-4 w-4 text-indigo-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'true-false') {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-900">{question.text}</p>
        <div className="flex space-x-4">
          {['True', 'False'].map((option) => (
            <Button
              key={option}
              onClick={() => onAnswerChange(option)}
              className={
                userAnswer === option
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-gray-900">{question.text}</p>
      <textarea
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        placeholder="Type your answer here..."
      />
    </div>
  );
}