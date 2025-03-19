
export type ProjectStatus = 'in-progress' | 'completed' | 'overdue' | 'planned';
export type ProjectPriority = 'high' | 'medium' | 'low';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  dueDate: string;
  team: TeamMember[];
  tasks: ProjectTask[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Research',
    description: 'Research project on implementing advanced ML algorithms for educational pattern recognition',
    status: 'in-progress',
    priority: 'high',
    progress: 45,
    startDate: '2025-02-15',
    dueDate: '2025-06-30',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', role: 'ML Specialist', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-3', name: 'Miguel Rodriguez', role: 'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=12' }
    ],
    tasks: [
      { id: 'task-1', title: 'Literature review', completed: true },
      { id: 'task-2', title: 'Data collection', completed: true },
      { id: 'task-3', title: 'Algorithm implementation', completed: false },
      { id: 'task-4', title: 'Testing and validation', completed: false },
      { id: 'task-5', title: 'Documentation', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Interactive Learning Platform',
    description: 'Developing an interactive platform for collaborative learning experiences',
    status: 'in-progress',
    priority: 'medium',
    progress: 70,
    startDate: '2025-01-10',
    dueDate: '2025-05-15',
    team: [
      { id: 'user-2', name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-4', name: 'David Chen', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=8' }
    ],
    tasks: [
      { id: 'task-1', title: 'UI/UX design', completed: true },
      { id: 'task-2', title: 'Frontend implementation', completed: true },
      { id: 'task-3', title: 'Backend integration', completed: true },
      { id: 'task-4', title: 'User testing', completed: false },
      { id: 'task-5', title: 'Launch preparation', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Quantum Computing Study Group',
    description: 'Organizing a study group to explore quantum computing principles and applications',
    status: 'planned',
    priority: 'medium',
    progress: 10,
    startDate: '2025-08-01',
    dueDate: '2025-12-15',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-6', name: 'Lisa Wang', role: 'Physics Specialist', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    tasks: [
      { id: 'task-1', title: 'Create curriculum', completed: true },
      { id: 'task-2', title: 'Recruit participants', completed: false },
      { id: 'task-3', title: 'Schedule meetings', completed: false },
      { id: 'task-4', title: 'Prepare materials', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Capstone Project: Smart Education',
    description: 'Final year project developing AI-powered education tools for personalized learning',
    status: 'overdue',
    priority: 'high',
    progress: 60,
    startDate: '2024-09-01',
    dueDate: '2025-03-01',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', role: 'AI Developer', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-5', name: 'James Wilson', role: 'Education Specialist', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    tasks: [
      { id: 'task-1', title: 'Project proposal', completed: true },
      { id: 'task-2', title: 'Research and planning', completed: true },
      { id: 'task-3', title: 'Development phase 1', completed: true },
      { id: 'task-4', title: 'Development phase 2', completed: false },
      { id: 'task-5', title: 'Testing phase', completed: false },
      { id: 'task-6', title: 'Final presentation', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Academic Research Paper',
    description: 'Collaborative research paper on the impact of digital tools in modern education',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    startDate: '2024-12-01',
    dueDate: '2025-02-28',
    team: [
      { id: 'user-1', name: 'John Doe', role: 'Lead Author', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-7', name: 'Emily Taylor', role: 'Co-Author', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    tasks: [
      { id: 'task-1', title: 'Literature review', completed: true },
      { id: 'task-2', title: 'Outline creation', completed: true },
      { id: 'task-3', title: 'Draft writing', completed: true },
      { id: 'task-4', title: 'Peer review', completed: true },
      { id: 'task-5', title: 'Final submission', completed: true }
    ]
  },
  {
    id: '6',
    title: 'Educational App Development',
    description: 'Developing a mobile app for vocabulary enhancement through gamification',
    status: 'in-progress',
    priority: 'high',
    progress: 35,
    startDate: '2025-01-15',
    dueDate: '2025-07-30',
    team: [
      { id: 'user-4', name: 'David Chen', role: 'Mobile Developer', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 'user-8', name: 'Rachel Green', role: 'Game Designer', avatar: 'https://i.pravatar.cc/150?img=10' }
    ],
    tasks: [
      { id: 'task-1', title: 'Concept development', completed: true },
      { id: 'task-2', title: 'UI/UX design', completed: true },
      { id: 'task-3', title: 'Frontend development', completed: false },
      { id: 'task-4', title: 'Backend integration', completed: false },
      { id: 'task-5', title: 'Content creation', completed: false },
      { id: 'task-6', title: 'Testing and deployment', completed: false }
    ]
  }
];

export const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'planned':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const getStatusText = (status: ProjectStatus): string => {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'overdue':
      return 'Overdue';
    case 'planned':
      return 'Planned';
    default:
      return status;
  }
};

export const getPriorityColor = (priority: ProjectPriority): string => {
  switch (priority) {
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'low':
      return 'text-green-500 dark:text-green-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
};

export const getPriorityOptions = [
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
];
