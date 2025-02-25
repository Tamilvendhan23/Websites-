import { create } from 'zustand';
import { Exam } from '../types';

interface ExamState {
  exams: Exam[];
  addExam: (exam: Exam) => void;
  updateExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
}

export const useExamStore = create<ExamState>((set) => ({
  exams: [],
  addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
  updateExam: (exam) => 
    set((state) => ({
      exams: state.exams.map((e) => (e.id === exam.id ? exam : e)),
    })),
  deleteExam: (id) =>
    set((state) => ({
      exams: state.exams.filter((e) => e.id !== id),
    })),
}));