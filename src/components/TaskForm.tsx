import { Dialog, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel,Box,} from '@mui/material';
import { useState, useEffect } from 'react';
import { TaskFormValues } from '../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormValues) => void;
  initialData?: Partial<TaskFormValues>;
}

const assignees = ['Димон Тапок', 'Егорка Зашибу', 'Дед Бомбом'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['To do', 'In progress', 'Done'];
const projects = ['Анекдоты бам-бам-бам', 'Как жить то?', 'Заминированный тапок'];

export default function TaskForm({
  open,
  onClose,
  onSubmit,
  initialData = {},
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormValues>({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To do',
    assignee: assignees[0],
    boardId: '',
    ...initialData,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To do',
        assignee: assignees[0],
        boardId: '',
        ...initialData,
      });
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      
      
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            name="title"
            label="Название"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            name="description"
            label="Описание"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

            <FormControl fullWidth>
            <InputLabel>Проект</InputLabel>
            <Select
              name="projects"
              value={formData.priority}
              label="Проект"
              onChange={handleSelectChange}
            >
              {projects.map(p => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Приоритет"
              onChange={handleSelectChange}
            >
              {priorities.map(p => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Статус"
              onChange={handleSelectChange}
            >
              {statuses.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Исполнитель</InputLabel>
            <Select
              name="assignee"
              value={formData.assignee}
              label="Исполнитель"
              onChange={handleSelectChange}
            >
              {assignees.map(a => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData?.id ? 'Создать' : 'Обновить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

