import React from 'react';
import { StatsCard } from '../dashboard/stats-card';
import { BookOpen, Clock, Award, Users, CheckCircle } from 'lucide-react';

interface StatsData {
  totalExams: number;
  activeExams: number;
  averageScore: string;
  totalParticipants: number;
}

interface StatsOverviewProps {
  data: StatsData;
  userRole: 'student' | 'teacher';
}

export function StatsOverview({ data, userRole }: StatsOverviewProps) {
  const studentStats = [
    {
      title: 'Upcoming Exams',
      value: data.activeExams,
      icon: <Clock className="h-6 w-6" />,
      description: 'Scheduled exams',
    },
    {
      title: 'Completed Exams',
      value: data.totalExams - data.activeExams,
      icon: <CheckCircle className="h-6 w-6" />,
      description: 'Successfully completed',
    },
    {
      title: 'Average Score',
      value: data.averageScore,
      icon: <Award className="h-6 w-6" />,
      description: 'Overall performance',
    },
    {
      title: 'Active Courses',
      value: Math.ceil(data.totalExams / 3),
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Enrolled courses',
    },
  ];

  const teacherStats = [
    {
      title: 'Active Exams',
      value: data.activeExams,
      icon: <Clock className="h-6 w-6" />,
      description: 'Currently running',
    },
    {
      title: 'Total Students',
      value: data.totalParticipants,
      icon: <Users className="h-6 w-6" />,
      description: 'Enrolled students',
    },
    {
      title: 'Average Score',
      value: data.averageScore,
      icon: <Award className="h-6 w-6" />,
      description: 'Class performance',
    },
    {
      title: 'Total Exams',
      value: data.totalExams,
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Created exams',
    },
  ];

  const stats = userRole === 'student' ? studentStats : teacherStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
}