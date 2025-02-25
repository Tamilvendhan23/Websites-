import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamForm } from '../../components/exam/exam-form';
import { useExamStore } from '../../store/exam';
import { useAuthStore } from '../../store/auth';

export function CreateExam() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addExam = useExamStore((state) => state.addExam);

  if (user?.role !== 'teacher') {
    navigate('/exams');
    return null;
  }

  const handleSubmit = (data: any) => {
    addExam({
      ...data,
      createdBy: user.id,
    });
    navigate('/exams');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Create New Exam</h1>
      <ExamForm onSubmit={handleSubmit} />
    </div>
  );
}