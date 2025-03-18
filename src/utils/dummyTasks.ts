
import { addDays, addMonths, format, setMonth, setDate } from 'date-fns';

export interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  assignedTo?: string;
  assignedBy?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

const courses = [
  'Introduction to Programming',
  'Data Structures and Algorithms',
  'Database Systems',
  'Web Development',
  'Artificial Intelligence',
  'Computer Networks',
  'Operating Systems',
  'Software Engineering',
  'Computer Architecture',
  'Machine Learning'
];

const taskTitles = [
  'Submit Assignment',
  'Complete Project Milestone',
  'Prepare Presentation',
  'Review Lecture Notes',
  'Research Paper',
  'Group Project Meeting',
  'Study for Quiz',
  'Lab Report',
  'Coding Exercise',
  'Exam Preparation'
];

function generateRandomDate(year = 2025, startMonth = 0, endMonth = 11) {
  const date = new Date();
  const month = Math.floor(Math.random() * (endMonth - startMonth + 1)) + startMonth;
  const day = Math.floor(Math.random() * 28) + 1; // Avoiding edge cases with month lengths
  
  return setDate(setMonth(new Date(year, 0, 1), month), day);
}

function generateTaskStatus(dueDate: Date): 'completed' | 'in-progress' | 'overdue' | 'upcoming' {
  const now = new Date(2025, 3, 15); // Assuming current date is April 15, 2025
  
  if (dueDate < now) {
    return Math.random() > 0.3 ? 'completed' : 'overdue';
  } else if (dueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return 'in-progress';
  } else {
    return 'upcoming';
  }
}

export function generateDummyTasks(count = 20): Task[] {
  const tasks: Task[] = [];
  
  for (let i = 0; i < count; i++) {
    const dueDate = generateRandomDate();
    const status = generateTaskStatus(dueDate);
    const priority = ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low';
    const createdAt = format(addDays(dueDate, -14 - Math.floor(Math.random() * 30)), 'yyyy-MM-dd');
    
    const task: Task = {
      id: `task-${i + 1}`,
      title: `${taskTitles[Math.floor(Math.random() * taskTitles.length)]} ${i + 1}`,
      course: courses[Math.floor(Math.random() * courses.length)],
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      status,
      priority,
      description: `This is a detailed description for task ${i + 1}. It explains what needs to be done for the ${courses[Math.floor(Math.random() * courses.length)]} course.`,
      createdAt,
    };
    
    if (status === 'completed') {
      task.completedAt = format(addDays(dueDate, -Math.floor(Math.random() * 7)), 'yyyy-MM-dd');
      task.updatedAt = task.completedAt;
    } else if (status === 'in-progress') {
      task.updatedAt = format(addDays(new Date(createdAt), Math.floor(Math.random() * 10)), 'yyyy-MM-dd');
    }
    
    tasks.push(task);
  }
  
  return tasks;
}

export function generateTasksForStudent(studentId: string, count = 15): Task[] {
  const tasks = generateDummyTasks(count);
  return tasks.map(task => ({
    ...task,
    assignedTo: studentId,
    assignedBy: `professor-${Math.floor(Math.random() * 5) + 1}`
  }));
}

export function generateMonthlyTasks(year = 2025): Record<string, Task[]> {
  const monthlyTasks: Record<string, Task[]> = {};
  
  for (let month = 0; month < 12; month++) {
    const tasksCount = 5 + Math.floor(Math.random() * 10); // 5-15 tasks per month
    const tasks: Task[] = [];
    
    for (let i = 0; i < tasksCount; i++) {
      const dueDate = new Date(year, month, Math.floor(Math.random() * 28) + 1);
      const status = generateTaskStatus(dueDate);
      const priority = ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low';
      const createdDate = addDays(dueDate, -(Math.floor(Math.random() * 14) + 1));
      
      const task: Task = {
        id: `task-${month}-${i}`,
        title: `${taskTitles[Math.floor(Math.random() * taskTitles.length)]}`,
        course: courses[Math.floor(Math.random() * courses.length)],
        dueDate: format(dueDate, 'yyyy-MM-dd'),
        status,
        priority,
        createdAt: format(createdDate, 'yyyy-MM-dd'),
      };
      
      if (status === 'completed') {
        task.completedAt = format(addDays(dueDate, -Math.floor(Math.random() * 3)), 'yyyy-MM-dd');
      }
      
      tasks.push(task);
    }
    
    const monthName = format(new Date(year, month, 1), 'MMMM');
    monthlyTasks[monthName] = tasks;
  }
  
  return monthlyTasks;
}

// Generate upcoming tasks for the current week and next week
export function generateUpcomingTasks(): Task[] {
  const now = new Date(2025, 3, 15); // April 15, 2025
  const tasks: Task[] = [];
  
  // Current week tasks
  for (let i = 0; i < 5; i++) {
    const dueDate = addDays(now, i);
    
    tasks.push({
      id: `upcoming-${i}`,
      title: `${taskTitles[Math.floor(Math.random() * taskTitles.length)]}`,
      course: courses[Math.floor(Math.random() * courses.length)],
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      status: 'upcoming',
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
      createdAt: format(addDays(dueDate, -7), 'yyyy-MM-dd'),
    });
  }
  
  // Next week tasks
  for (let i = 0; i < 5; i++) {
    const dueDate = addDays(now, 7 + i);
    
    tasks.push({
      id: `upcoming-next-${i}`,
      title: `${taskTitles[Math.floor(Math.random() * taskTitles.length)]}`,
      course: courses[Math.floor(Math.random() * courses.length)],
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      status: 'upcoming',
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
      createdAt: format(addDays(dueDate, -10), 'yyyy-MM-dd'),
    });
  }
  
  return tasks;
}

// Generate completed tasks history
export function generateCompletedTasksHistory(months = 6): Task[] {
  const now = new Date(2025, 3, 15); // April 15, 2025
  const tasks: Task[] = [];
  
  for (let i = 0; i < months; i++) {
    const monthDate = addMonths(now, -i);
    const tasksCount = 3 + Math.floor(Math.random() * 7); // 3-10 tasks per month
    
    for (let j = 0; j < tasksCount; j++) {
      const dueDate = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        Math.floor(Math.random() * 28) + 1
      );
      
      const completedAt = addDays(dueDate, -Math.floor(Math.random() * 3));
      
      tasks.push({
        id: `completed-${i}-${j}`,
        title: `${taskTitles[Math.floor(Math.random() * taskTitles.length)]}`,
        course: courses[Math.floor(Math.random() * courses.length)],
        dueDate: format(dueDate, 'yyyy-MM-dd'),
        status: 'completed',
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        createdAt: format(addDays(dueDate, -14), 'yyyy-MM-dd'),
        completedAt: format(completedAt, 'yyyy-MM-dd'),
        updatedAt: format(completedAt, 'yyyy-MM-dd'),
      });
    }
  }
  
  return tasks;
}
