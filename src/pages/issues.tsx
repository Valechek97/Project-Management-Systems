import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography,  Card, CardContent, Button,  Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchTasks, fetchBoards } from '../utils/api';
import { Task, Board } from '../types';
import TaskForm from '../components/TaskForm';
import TaskModal from '../components/TaskModal';

export default function IssuesPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const tasksData = await fetchTasks();
      const boardsData = await fetchBoards();
      setTasks(tasksData);
      setBoards(boardsData);
    };
    loadData();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    console.log('Task created:', taskData);
    setFormOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const getBoardTitle = (boardId: string) => {
    return boards.find(b => b.id === boardId)?.title || boardId;
  };

  return (
    <Box sx={{ p: 3 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Проекты и задачи</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>Создать задачу</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Доска</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Приоритет</TableCell>
              <TableCell>Исполнитель</TableCell>
            </TableRow>
          </TableHead>
         
          <TableBody>

            {tasks.map(task => (
              <TableRow 
                key={task.id} 
                hover 
                onClick={() => handleTaskClick(task)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{task.title}</TableCell>

                <TableCell>
                  <Link to={`/board/${task.boardId}`} onClick={e => e.stopPropagation()}>
                    {getBoardTitle(task.boardId)}
                  </Link>
                </TableCell>

                <TableCell>
                  <Chip label={task.status} color={
                    task.status === 'done' ? 'success' : 
                    task.status === 'in-progress' ? 'primary' : 'default'
                  } />
                </TableCell>

                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreateTask} />
      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={selectedTask} onSave={handleTaskUpdate}/>

    </Box>
  );
}