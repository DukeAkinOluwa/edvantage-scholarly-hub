
/**
 * Utility for exporting data as PDF
 * In a real app, this would use a library like jsPDF, pdfmake, etc.
 * This is a simplified mock version.
 */

export interface UserDataForExport {
  user: {
    id: string;
    name: string;
    email: string;
    university?: string;
    department?: string;
    level?: string;
    joinedAt: string;
  };
  statistics: {
    totalTasksCreated: number;
    totalTasksCompleted: number;
    completionRate: number;
    averageTimeToComplete: string;
    studyHours: number;
    projectsJoined: number;
    projectsCompleted: number;
    achievementsEarned: number;
    totalPoints: number;
  };
  achievements: {
    id: string;
    title: string;
    earnedAt: string;
    points: number;
  }[];
  recentActivity: {
    date: string;
    action: string;
    details: string;
  }[];
}

export const generateUserDataPDF = async (userData: UserDataForExport): Promise<string> => {
  // In a real app, this would generate a PDF file
  // For this example, we'll just mock the process
  
  console.log('Generating PDF for user data:', userData);
  
  // Simulate PDF generation time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a fake PDF URL
  // In a real app, this would be a blob URL or a download link
  return 'user-data-export.pdf';
};

export const collectUserData = async (userId: string): Promise<UserDataForExport> => {
  // In a real app, this would collect data from various stores
  // For this example, we'll generate mock data
  
  // Simulate data collection time
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock statistics
  const statistics = {
    totalTasksCreated: Math.floor(Math.random() * 50) + 10,
    totalTasksCompleted: Math.floor(Math.random() * 40) + 5,
    completionRate: Math.floor(Math.random() * 30) + 70,
    averageTimeToComplete: `${Math.floor(Math.random() * 3) + 1} days`,
    studyHours: Math.floor(Math.random() * 100) + 20,
    projectsJoined: Math.floor(Math.random() * 10) + 1,
    projectsCompleted: Math.floor(Math.random() * 5) + 1,
    achievementsEarned: Math.floor(Math.random() * 15) + 5,
    totalPoints: Math.floor(Math.random() * 1000) + 200,
  };
  
  // Generate mock achievements
  const achievements = Array.from({ length: statistics.achievementsEarned }).map((_, index) => ({
    id: `achievement-${index + 1}`,
    title: [
      'Early Riser', 
      'Task Master', 
      'Group Leader', 
      'Resource Guru', 
      'Project Wizard',
      'Consistency King',
      'Academic Explorer',
      'Knowledge Seeker',
      'Study Champion',
      'AI Assistant Guru'
    ][index % 10],
    earnedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    points: (Math.floor(Math.random() * 10) + 1) * 10,
  }));
  
  // Generate recent activity
  const activityTypes = [
    'Completed a task',
    'Joined a group',
    'Created a project',
    'Earned an achievement',
    'Shared resources',
    'Used AI assistance',
    'Created a schedule',
    'Updated profile'
  ];
  
  const recentActivity = Array.from({ length: 10 }).map((_, index) => ({
    date: new Date(Date.now() - index * 86400000 * Math.floor(Math.random() * 3 + 1)).toISOString(),
    action: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    details: `Details for activity ${index + 1}`,
  }));
  
  // Create user data object
  const userData: UserDataForExport = {
    user: {
      id: userId,
      name: 'John Doe',
      email: 'johndoe@example.com',
      university: 'University of Lagos',
      department: 'Computer Science',
      level: '300 Level',
      joinedAt: '2025-05-01',
    },
    statistics,
    achievements,
    recentActivity,
  };
  
  return userData;
};
