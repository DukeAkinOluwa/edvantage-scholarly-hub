
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  generateDummyTasks, 
  generateTasksForStudent, 
  generateUpcomingTasks, 
  generateCompletedTasksHistory 
} from '@/utils/dummyTasks';
import { db, getLocalStorageItem, setLocalStorageItem } from '@/utils/storage';

export type Task = {
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
};

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load tasks from storage or generate new ones
  const loadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to get tasks from IndexedDB first
      let userTasks: Task[] = [];
      
      try {
        // Check if we have tasks in IndexedDB
        userTasks = await db.getAll<Task>('tasks');
        
        // Filter to get only this user's tasks
        if (userTasks && userTasks.length > 0) {
          userTasks = userTasks.filter(task => task.assignedTo === user.id);
        }
      } catch (dbError) {
        console.error('Error getting tasks from IndexedDB:', dbError);
        
        // Fallback to localStorage
        const localTasks = getLocalStorageItem<Task[]>(`edvantage-tasks-${user.id}`);
        if (localTasks && localTasks.length > 0) {
          userTasks = localTasks;
        }
      }
      
      // If we don't have any tasks yet, generate dummy data
      if (!userTasks || userTasks.length === 0) {
        userTasks = user.accountType === 'organization' 
          ? generateDummyTasks(30) 
          : generateTasksForStudent(user.id, 20);
        
        // Store the generated tasks in both storage options
        try {
          // Store in localStorage as backup
          setLocalStorageItem(`edvantage-tasks-${user.id}`, userTasks);
          
          // Store each task in IndexedDB
          for (const task of userTasks) {
            await db.add('tasks', task);
          }
        } catch (storageError) {
          console.error('Error storing tasks:', storageError);
        }
      }
      
      setTasks(userTasks);
    } catch (error) {
      console.error('Error in useTasks hook:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get tasks for specific status
  const getTasksByStatus = useCallback((status: Task['status'] | 'all') => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  // Get upcoming tasks (due within 7 days)
  const getUpcomingTasks = useCallback(() => {
    const now = new Date('2025-04-15');
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return (
        dueDate >= now && 
        dueDate <= nextWeek && 
        task.status !== 'completed'
      );
    });
  }, [tasks]);

  // Mark task as completed
  const completeTask = useCallback(async (taskId: string) => {
    const now = new Date('2025-04-15').toISOString();
    
    // Update task in state
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'completed' as const,
            completedAt: now.split('T')[0],
            updatedAt: now.split('T')[0]
          };
        }
        return task;
      })
    );
    
    if (!user) return;
    
    try {
      // Get the updated task
      const updatedTask = tasks.find(t => t.id === taskId);
      if (!updatedTask) return;
      
      const completedTask = {
        ...updatedTask,
        status: 'completed' as const,
        completedAt: now.split('T')[0],
        updatedAt: now.split('T')[0]
      };
      
      // Update in IndexedDB
      await db.put('tasks', completedTask);
      
      // Update in localStorage as backup
      const localTasks = getLocalStorageItem<Task[]>(`edvantage-tasks-${user.id}`) || [];
      const updatedLocalTasks = localTasks.map(task => 
        task.id === taskId ? completedTask : task
      );
      setLocalStorageItem(`edvantage-tasks-${user.id}`, updatedLocalTasks);
      
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, [tasks, user]);

  // Add a new task
  const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: Task['status'] }) => {
    if (!user) return;
    
    const now = new Date('2025-04-15').toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      createdAt: now.split('T')[0],
      status: taskData.status || 'upcoming',
      ...taskData,
    };
    
    // Update state
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    try {
      // Add to IndexedDB
      await db.add('tasks', newTask);
      
      // Update localStorage backup
      const localTasks = getLocalStorageItem<Task[]>(`edvantage-tasks-${user.id}`) || [];
      setLocalStorageItem(`edvantage-tasks-${user.id}`, [...localTasks, newTask]);
      
    } catch (error) {
      console.error('Error adding task:', error);
    }
    
    return newTask;
  }, [user]);

  // Load tasks when component mounts or user changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    isLoading,
    error,
    getTasksByStatus,
    getUpcomingTasks,
    completeTask,
    addTask,
    refreshTasks: loadTasks
  };
}
