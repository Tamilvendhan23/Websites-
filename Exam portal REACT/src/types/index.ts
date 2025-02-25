export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
};

export type Question = {
  id: string;
  text: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  createdBy: string;
  startTime: string;
  endTime: string;
};