import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchBoards } from '../utils/api';
import { Board } from '../types';
import TaskForm from '../components/TaskForm';

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const loadBoards = async () => {
      const data = await fetchBoards();
      setBoards(data);
    };
    loadBoards();
  }, []);

  const handleCreateTask = async (taskData: any) => {
    console.log('Task created:', taskData);
    setFormOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Проекты</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}> Новая задача </Button>
        </Box>

      <Grid container spacing={3}>
        {boards.map(board => (
          <Grid item xs={12} sm={6} md={4} key={board.id}>
            <Card component={Link} to={`/board/${board.id}`} sx={{ textDecoration: 'none' }}>
              <CardContent>
                <Typography variant="h6">{board.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {board.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateTask}
      />
    </Box>
  );
}