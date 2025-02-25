import React from 'react';
import { useAuthStore } from '../../store/auth';
import { StudentDashboard } from './student-dashboard';
import { TeacherDashboard } from './teacher-dashboard';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Please Log In</h2>
        <p className="mt-2 text-gray-600">You need to be logged in to view your dashboard.</p>
      </div>
    );
  }

  return user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
}