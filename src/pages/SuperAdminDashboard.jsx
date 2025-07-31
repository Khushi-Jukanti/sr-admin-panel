import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { sampleUsers } from '../data/sampleUsers.js';
import { paperSetterData } from '../data/paperSetterData.js';

const SuperAdminDashboard = () => {
  // Calculate statistics
  const totalUsers = sampleUsers.length;
  const totalTeachers = sampleUsers.filter(user => user.role === 'teacher').length;
  const totalStudents = sampleUsers.filter(user => user.role === 'student').length;
  
  const submittedPapers = paperSetterData.filter(paper => paper.submissionStatus === 'submitted').length;
  const pendingPapers = paperSetterData.filter(paper => paper.submissionStatus === 'pending').length;
  const overduePapers = paperSetterData.filter(paper => paper.submissionStatus === 'overdue').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      description: 'Active users in system',
      icon: Users,
      trend: '+12%'
    },
    {
      title: 'Teachers',
      value: totalTeachers,
      description: 'Faculty members',
      icon: Users,
      trend: '+5%'
    },
    {
      title: 'Students',
      value: totalStudents,
      description: 'Enrolled students',
      icon: Users,
      trend: '+18%'
    },
    {
      title: 'Timetable Classes',
      value: 156,
      description: 'Scheduled classes',
      icon: Calendar,
      trend: '+8%'
    }
  ];

  const paperStats = [
    {
      title: 'Submitted Papers',
      value: submittedPapers,
      description: 'Papers submitted on time',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Pending Papers',
      value: pendingPapers,
      description: 'Awaiting submission',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Overdue Papers',
      value: overduePapers,
      description: 'Past deadline',
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SR Institutes Timetable Management System
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center mt-2 text-xs">
                  <TrendingUp className="w-3 h-3 text-success mr-1" />
                  <span className="text-success">{stat.trend}</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Paper Setter Status */}
      <div className="grid gap-4 md:grid-cols-3">
        {paperStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role} • {user.campus}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {user.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paper Submission Status</CardTitle>
            <CardDescription>Weekend test paper assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paperSetterData.slice(0, 5).map((paper) => (
              <div key={paper.id} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  paper.submissionStatus === 'submitted' ? 'bg-success' :
                  paper.submissionStatus === 'pending' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{paper.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {paper.teacherName} • {paper.campus}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  paper.submissionStatus === 'submitted' ? 'bg-success/10 text-success' :
                  paper.submissionStatus === 'pending' ? 'bg-warning/10 text-warning' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {paper.submissionStatus}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;