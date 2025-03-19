
import { BookOpen, Users, Briefcase, Brain, Award, CalendarClock } from 'lucide-react';

// Task types
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  points: number;
};

// Event types
export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  type: 'class' | 'exam' | 'study' | 'personal' | 'group';
};

// Group types
export type GroupType = 'study' | 'class' | 'project';
export type GroupMember = {
  id: string;
  name: string;
  profilePic: string;
  role: 'admin' | 'member';
};

export type Group = {
  id: string;
  name: string;
  description: string;
  type: GroupType;
  createdAt: string;
  members: GroupMember[];
  coverImage?: string;
};

// Resource types
export type ResourceType = 'pdf' | 'video' | 'link' | 'note' | 'image';
export type Resource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
  likes: number;
  downloads: number;
};

// Notification types
export type NotificationType = 'task' | 'event' | 'group' | 'message' | 'achievement';
export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
};

// Achievement types
export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  points: number;
  progress: number;
  maxProgress: number;
};

// Leaderboard types
export type LeaderboardEntry = {
  id: string;
  name: string;
  profilePic: string;
  points: number;
  rank: number;
  level: string;
  achievements: number;
};

// Dashboard feature types
export type DashboardFeature = {
  id: string;
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
};

// Dummy data
export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Data Structures Assignment',
    description: 'Implement a binary search tree and submit the code.',
    dueDate: '2025-06-10T23:59:59',
    priority: 'high',
    status: 'completed',
    category: 'Computer Science',
    points: 50
  },
  {
    id: 'task-2',
    title: 'Read Chapter 5 for Economics',
    description: 'Focus on the part about market structures.',
    dueDate: '2025-06-12T18:00:00',
    priority: 'medium',
    status: 'pending',
    category: 'Economics',
    points: 30
  },
  {
    id: 'task-3',
    title: 'Prepare for Statistics Midterm',
    description: 'Review chapters 1-3, focus on probability distributions.',
    dueDate: '2025-06-15T10:00:00',
    priority: 'high',
    status: 'in-progress',
    category: 'Statistics',
    points: 80
  },
  {
    id: 'task-4',
    title: 'Complete Lab Report',
    description: 'Write up the findings from the physics experiment.',
    dueDate: '2025-06-08T23:59:59',
    priority: 'medium',
    status: 'overdue',
    category: 'Physics',
    points: 40
  },
  {
    id: 'task-5',
    title: 'Submit Research Topic Proposal',
    description: 'Finalize the research topic and submit a 2-page proposal.',
    dueDate: '2025-06-20T12:00:00',
    priority: 'low',
    status: 'pending',
    category: 'Research Methods',
    points: 60
  }
];

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Data Structures Lecture',
    description: 'Weekly lecture covering advanced tree structures.',
    startDate: '2025-06-09T10:00:00',
    endDate: '2025-06-09T12:00:00',
    location: 'Room 301, CS Building',
    type: 'class'
  },
  {
    id: 'event-2',
    title: 'Statistics Midterm Exam',
    description: 'Covers chapters 1-3, bring a calculator.',
    startDate: '2025-06-15T09:00:00',
    endDate: '2025-06-15T11:00:00',
    location: 'Exam Hall 2',
    type: 'exam'
  },
  {
    id: 'event-3',
    title: 'Study Group: Economics',
    description: 'Discussing market structures from Chapter 5.',
    startDate: '2025-06-11T15:00:00',
    endDate: '2025-06-11T17:00:00',
    location: 'Library Study Room 4',
    type: 'study'
  },
  {
    id: 'event-4',
    title: 'Project Team Meeting',
    description: 'Discussing progress on the final project.',
    startDate: '2025-06-10T16:00:00',
    endDate: '2025-06-10T17:30:00',
    location: 'Online (Zoom)',
    type: 'group'
  },
  {
    id: 'event-5',
    title: 'Department Seminar',
    description: 'Guest speaker from Google discussing AI applications.',
    startDate: '2025-06-14T14:00:00',
    endDate: '2025-06-14T16:00:00',
    location: 'Main Auditorium',
    type: 'class'
  }
];

export const groups: Group[] = [
  {
    id: 'group-1',
    name: 'CS 301 Study Group',
    description: 'For students taking Data Structures and Algorithms this semester.',
    type: 'study',
    createdAt: '2025-04-15T10:00:00',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        profilePic: 'https://i.pravatar.cc/150?img=1',
        role: 'admin'
      },
      {
        id: 'user-2',
        name: 'Jane Smith',
        profilePic: 'https://i.pravatar.cc/150?img=2',
        role: 'member'
      },
      {
        id: 'user-3',
        name: 'Michael Johnson',
        profilePic: 'https://i.pravatar.cc/150?img=3',
        role: 'member'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353'
  },
  {
    id: 'group-2',
    name: 'Computer Science 300 Level',
    description: 'Official group for all 300 level Computer Science students.',
    type: 'class',
    createdAt: '2025-03-01T08:30:00',
    members: [
      {
        id: 'user-4',
        name: 'Emily Chen',
        profilePic: 'https://i.pravatar.cc/150?img=5',
        role: 'admin'
      },
      {
        id: 'user-1',
        name: 'John Doe',
        profilePic: 'https://i.pravatar.cc/150?img=1',
        role: 'member'
      },
      {
        id: 'user-5',
        name: 'David Kim',
        profilePic: 'https://i.pravatar.cc/150?img=4',
        role: 'member'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
  },
  {
    id: 'group-3',
    name: 'Final Year Project Team',
    description: 'Group for coordinating our final year project on machine learning.',
    type: 'project',
    createdAt: '2025-05-10T14:15:00',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        profilePic: 'https://i.pravatar.cc/150?img=1',
        role: 'member'
      },
      {
        id: 'user-6',
        name: 'Sarah Johnson',
        profilePic: 'https://i.pravatar.cc/150?img=6',
        role: 'admin'
      },
      {
        id: 'user-7',
        name: 'Robert Lee',
        profilePic: 'https://i.pravatar.cc/150?img=7',
        role: 'member'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978'
  }
];

export const resources: Resource[] = [
  {
    id: 'resource-1',
    title: 'Data Structures Cheat Sheet',
    description: 'Comprehensive overview of all data structures covered this semester.',
    type: 'pdf',
    url: '#',
    uploadedBy: 'Dr. Smith',
    uploadedAt: '2025-05-20T10:15:00',
    category: 'Computer Science',
    likes: 125,
    downloads: 78
  },
  {
    id: 'resource-2',
    title: 'Statistical Methods Explained',
    description: 'Video tutorial explaining key statistical concepts for the midterm.',
    type: 'video',
    url: '#',
    uploadedBy: 'Prof. Johnson',
    uploadedAt: '2025-05-18T14:30:00',
    category: 'Statistics',
    likes: 89,
    downloads: 42
  },
  {
    id: 'resource-3',
    title: 'Economics: Market Structures',
    description: 'Detailed notes on different market structures from Chapter 5.',
    type: 'note',
    url: '#',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2025-06-02T09:45:00',
    category: 'Economics',
    likes: 56,
    downloads: 31
  },
  {
    id: 'resource-4',
    title: 'Physics Lab Report Template',
    description: 'Standard template for physics lab reports with example.',
    type: 'pdf',
    url: '#',
    uploadedBy: 'Lab Instructor',
    uploadedAt: '2025-04-10T11:20:00',
    category: 'Physics',
    likes: 102,
    downloads: 67
  },
  {
    id: 'resource-5',
    title: 'Research Methods Overview',
    description: 'Helpful website with guides on conducting academic research.',
    type: 'link',
    url: 'https://example.com/research-methods',
    uploadedBy: 'Dr. Williams',
    uploadedAt: '2025-05-25T15:10:00',
    category: 'Research Methods',
    likes: 45,
    downloads: 0
  }
];

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'task',
    title: 'Task Due Soon',
    message: 'Your "Data Structures Assignment" is due in 2 days.',
    time: '2025-06-08T09:00:00',
    read: false,
    actionUrl: '/dashboard/tasks'
  },
  {
    id: 'notif-2',
    type: 'event',
    title: 'Upcoming Exam',
    message: 'Statistics Midterm Exam is scheduled for tomorrow at 9:00 AM.',
    time: '2025-06-14T18:30:00',
    read: true,
    actionUrl: '/dashboard/calendar'
  },
  {
    id: 'notif-3',
    type: 'group',
    title: 'New Group Member',
    message: 'Alex Wu has joined "CS 301 Study Group".',
    time: '2025-06-07T14:15:00',
    read: false,
    actionUrl: '/dashboard/groups/group-1'
  },
  {
    id: 'notif-4',
    type: 'message',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message about the project meeting.',
    time: '2025-06-08T11:40:00',
    read: false,
    actionUrl: '/dashboard/messages'
  },
  {
    id: 'notif-5',
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You\'ve earned the "Task Master" badge.',
    time: '2025-06-07T20:05:00',
    read: true,
    actionUrl: '/dashboard/achievements'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Early Bird',
    description: 'Complete 5 tasks before their due date.',
    icon: '🌅',
    earnedAt: '2025-05-15T08:20:00',
    points: 50,
    progress: 5,
    maxProgress: 5
  },
  {
    id: 'achievement-2',
    title: 'Task Master',
    description: 'Complete 20 tasks in total.',
    icon: '✅',
    earnedAt: '2025-06-07T20:05:00',
    points: 100,
    progress: 20,
    maxProgress: 20
  },
  {
    id: 'achievement-3',
    title: 'Study Group Pro',
    description: 'Join or create 3 study groups.',
    icon: '👩‍👧‍👦',
    earnedAt: undefined,
    points: 75,
    progress: 2,
    maxProgress: 3
  },
  {
    id: 'achievement-4',
    title: 'Resource Collector',
    description: 'Access or download 15 resources.',
    icon: '📚',
    earnedAt: undefined,
    points: 60,
    progress: 8,
    maxProgress: 15
  },
  {
    id: 'achievement-5',
    title: 'Perfect Week',
    description: 'Complete all scheduled tasks for a week.',
    icon: '🏆',
    earnedAt: undefined,
    points: 150,
    progress: 4,
    maxProgress: 7
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    id: 'user-8',
    name: 'Alex Chen',
    profilePic: 'https://i.pravatar.cc/150?img=12',
    points: 1250,
    rank: 1,
    level: '300 Level',
    achievements: 8
  },
  {
    id: 'user-9',
    name: 'Maria Rodriguez',
    profilePic: 'https://i.pravatar.cc/150?img=13',
    points: 1120,
    rank: 2,
    level: '300 Level',
    achievements: 7
  },
  {
    id: 'user-10',
    name: 'James Wilson',
    profilePic: 'https://i.pravatar.cc/150?img=14',
    points: 980,
    rank: 3,
    level: '400 Level',
    achievements: 6
  },
  {
    id: 'user-1',
    name: 'John Doe',
    profilePic: 'https://i.pravatar.cc/150?img=1',
    points: 820,
    rank: 4,
    level: '300 Level',
    achievements: 5
  },
  {
    id: 'user-11',
    name: 'Emma Thompson',
    profilePic: 'https://i.pravatar.cc/150?img=15',
    points: 750,
    rank: 5,
    level: '200 Level',
    achievements: 4
  }
];

export const dashboardFeatures: DashboardFeature[] = [
  {
    id: 'feature-1',
    title: 'Schedule & Tasks',
    description: 'Manage your academic calendar and tasks',
    icon: CalendarClock,
    path: '/dashboard/calendar',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'feature-2',
    title: 'Resources',
    description: 'Access study materials and resources',
    icon: BookOpen,
    path: '/dashboard/resources',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'feature-3',
    title: 'Study Groups',
    description: 'Collaborate with peers in study groups',
    icon: Users,
    path: '/dashboard/groups',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'feature-4',
    title: 'Projects',
    description: 'Manage team projects and deadlines',
    icon: Briefcase,
    path: '/dashboard/projects',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'feature-5',
    title: 'AI Study Support',
    description: 'Get help with complex topics',
    icon: Brain,
    path: '/dashboard/ai-support',
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'feature-6',
    title: 'Achievements',
    description: 'Track your progress and rewards',
    icon: Award,
    path: '/dashboard/achievements',
    color: 'bg-yellow-100 text-yellow-600'
  }
];
