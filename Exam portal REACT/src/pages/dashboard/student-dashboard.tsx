import React from 'react';
import { StatsOverview } from '../../components/analytics/stats-overview';
import { PerformanceChart } from '../../components/analytics/performance-chart';
import { RecentActivity } from '../../components/analytics/recent-activity';
import { useAuthStore } from '../../store/auth';

export function StudentDashboard() {
  const user = useAuthStore((state) => state.user);

  // Mock data - In a real app, this would come from an API
  const statsData = {
    totalExams: 15,
    activeExams: 3,
    averageScore: '85%',
    totalParticipants: 45,
  };

  const performanceData = [
    { label: 'Mathematics', value: 92, color: '#4F46E5' },
    { label: 'Physics', value: 88, color: '#7C3AED' },
    { label: 'Chemistry', value: 76, color: '#EC4899' },
    { label: 'Biology', value: 95, color: '#10B981' },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'exam_completed',
      title: 'Mathematics Final Exam',
      timestamp: '2024-03-15T10:00:00',
      description: 'You scored 92%. Great job!',
    },
    {
      id: '2',
      type: 'exam_scheduled',
      title: 'Physics Mid-term',
      timestamp: '2024-03-20T14:30:00',
      description: 'Exam scheduled for next week',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's an overview of your academic progress</p>
        </div>
      </div>

      <StatsOverview data={statsData} userRole="student" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          data={performanceData}
          title="Subject Performance"
        />
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h3>
        <div className="divide-y divide-gray-200">
          {/* Add upcoming exams list */}
          <div className="py-4">
            <p className="text-sm font-medium text-gray-900">Physics Mid-term</p>
            <p className="text-sm text-gray-500">March 20, 2024 - 2:30 PM</p>
          </div>
          <div className="py-4">
            <p className="text-sm font-medium text-gray-900">Chemistry Quiz</p>
            <p className="text-sm text-gray-500">March 22, 2024 - 10:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}