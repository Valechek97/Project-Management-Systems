import { useState } from 'react';
import TaskForm from './TaskForm';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const handleFormSubmit = (taskData: any) => {
    console.log('Task created:', taskData);
    setFormOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Button  component={Link}  to="/boards" color="inherit" sx={{ textTransform: 'none' }}> Все задачи </Button>
            <Button  component={Link}  to="/issues"  color="inherit"sx={{ textTransform: 'none' }}> Проекты </Button>
          </Box>
          <Button  variant="contained" color="secondary" startIcon={<AddIcon />}  onClick={() => setFormOpen(true)}>
            Создать задачу  </Button>

        </Toolbar>
      </AppBar>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}