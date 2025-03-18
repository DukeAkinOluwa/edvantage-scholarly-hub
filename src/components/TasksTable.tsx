
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export type Task = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming';
  priority: 'high' | 'medium' | 'low';
};

interface TasksTableProps {
  tasks: Task[];
  emptyMessage?: string;
}

const statusIcons = {
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
  overdue: <AlertCircle className="h-4 w-4 text-red-500" />,
  upcoming: <Clock className="h-4 w-4 text-yellow-500" />
};

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  upcoming: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
};

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

const TasksTable: React.FC<TasksTableProps> = ({ tasks, emptyMessage = "No tasks found" }) => {
  if (!tasks.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.course}</TableCell>
              <TableCell>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                <Badge className={`flex items-center gap-1 ${statusColors[task.status]}`}>
                  {statusIcons[task.status]}
                  <span className="capitalize">{task.status.replace('-', ' ')}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`${priorityColors[task.priority]}`}>
                  <span className="capitalize">{task.priority}</span>
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
