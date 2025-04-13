import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip } from '@mui/material';
import TaskForm from './TaskForm';
import { Task } from '../types';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updatedTask: Task) => void;
}

export default function TaskModal({ open, onClose, task, onSave }: TaskModalProps) {
  const [editMode, setEditMode] = useState(false);

  if (!task) return null;

  return (
    <>
      {editMode ? (
        <TaskForm
          open={editMode}
          onClose={() => setEditMode(false)}
          onSubmit={(data) => {
            onSave({ ...task, ...data });
            setEditMode(false);
          }}
          initialData={task}
        />
      ) : (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              {task.title}
              <Button onClick={() => setEditMode(true)}>Редактировать</Button>
            </Box>

          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1">{task.description}</Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={`Проект: ${task.projects}`} color="primary" />
                <Chip label={`Приоритет: ${task.priority}`} />
                <Chip label={`Статус: ${task.status}`} color="primary" />
                <Chip label={`Исполнитель: ${task.assignee}`} variant="outlined" />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Создано: {new Date(task.createdAt).toLocaleString()}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Обновлено: {new Date(task.updatedAt).toLocaleString()}
              </Typography>
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}