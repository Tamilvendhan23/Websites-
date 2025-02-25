import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useExamStore } from '../../store/exam';
import { ExamCard } from '../../components/exam/exam-card';
import { Button } from '../../components/ui/button';

export function ExamList() {
  const user = useAuthStore((state) => state.user);
  const { exams, deleteExam } = useExamStore();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      deleteExam(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exams</h1>
        {user?.role === 'teacher' && (
          <Link to="/exam/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onDelete={user?.role === 'teacher' ? handleDelete : undefined}
          />
        ))}
        {exams.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No exams available.
          </div>
        )}
      </div>
    </div>
  );
}