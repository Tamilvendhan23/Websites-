import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
  onDelete?: (id: string) => void;
}

export function ExamCard({ exam, onDelete }: ExamCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{exam.description}</p>
        </div>
        {onDelete && (
          <Button
            onClick={() => onDelete(exam.id)}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          Duration: {exam.duration} minutes
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Start: {new Date(exam.startTime).toLocaleString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2" />
          Questions: {exam.questions.length}
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Link to={`/exam/${exam.id}`}>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Take Exam
          </Button>
        </Link>
      </div>
    </div>
  );
}