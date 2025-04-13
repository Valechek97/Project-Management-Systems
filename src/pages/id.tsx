import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchBoardById, fetchTasks, createTask } from '../utils/api';
import { Board, Task } from '../types';
import TaskModal from '../components/TaskModal';

const statusColors = {
  todo: 'default',
  'in-progress': 'primary',
  done: 'success',
};

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      const boardData = await fetchBoardById(id);
      const tasksData = await fetchTasks(id);
      
      if (boardData) setBoard(boardData);
      setTasks(tasksData);
    };
    loadData();
  }, [id]);

  const handleCreateTask = async (taskData: any) => {
    if (!id) return;
    
    const newTask = await createTask({
      ...taskData,
      boardId: id,
    });
    setTasks(prev => [...prev, newTask]);
    setFormOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  if (!board) return <Typography>Загрузка...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{board.title}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Новая задача
        </Button>
      </Box>

      <Typography variant="body1" paragraph>
        {board.description}
      </Typography>

      <Grid container spacing={3}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card onClick={() => handleTaskClick(task)} sx={{ cursor: 'pointer' }}>
              
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}> {task.description.substring(0, 50)}...</Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={task.priority} size="small" />
                  <Chip label={task.status}  size="small" color={statusColors[task.status]} />
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateTask}
        initialData={{ boardId: id }}
      />

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={selectedTask}
        onSave={handleTaskUpdate}
      />
    </Box>
  );
}