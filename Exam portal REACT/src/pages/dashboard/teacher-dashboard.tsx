import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { StatsOverview } from '../../components/analytics/stats-overview';
import { PerformanceChart } from '../../components/analytics/performance-chart';
import { RecentActivity } from '../../components/analytics/recent-activity';
import { useAuthStore } from '../../store/auth';

export function TeacherDashboard() {
  const user = useAuthStore((state) => state.user);

  // Mock data - In a real app, this would come from an API
  const statsData = {
    totalExams: 24,
    activeExams: 3,
    averageScore: '78%',
    totalParticipants: 150,
  };

  const performanceData = [
    { label: 'Class A', value: 85, color: '#4F46E5' },
    { label: 'Class B', value: 78, color: '#7C3AED' },
    { label: 'Class C', value: 92, color: '#EC4899' },
    { label: 'Class D', value: 71, color: '#10B981' },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'exam_completed',
      title: 'Final Exam - Class A',
      timestamp: '2024-03-15T10:00:00',
      description: 'Average score: 85%',
    },
    {
      id: '2',
      type: 'exam_scheduled',
      title: 'Mid-term - Class B',
      timestamp: '2024-03-20T14:30:00',
      description: 'Scheduled for next week',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Monitor your classes and exam performance</p>
        </div>
        <Link to="/exam/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New Exam
          </Button>
        </Link>
      </div>

      <StatsOverview data={statsData} userRole="teacher" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          data={performanceData}
          title="Class Performance"
        />
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h3>
          <div className="divide-y divide-gray-200">
            <div className="py-4">
              <p className="text-sm font-medium text-gray-900">John Doe - Physics Mid-term</p>
              <p className="text-sm text-gray-500">Score: 92% - March 15, 2024</p>
            </div>
            <div className="py-4">
              <p className="text-sm font-medium text-gray-900">Jane Smith - Chemistry Quiz</p>
              <p className="text-sm text-gray-500">Score: 88% - March 14, 2024</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Exams</h3>
          <div className="divide-y divide-gray-200">
            <div className="py-4">
              <p className="text-sm font-medium text-gray-900">Physics Mid-term - Class A</p>
              <p className="text-sm text-gray-500">In Progress - 25 students taking</p>
            </div>
            <div className="py-4">
              <p className="text-sm font-medium text-gray-900">Chemistry Quiz - Class B</p>
              <p className="text-sm text-gray-500">Starting in 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}