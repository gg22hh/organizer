import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import s from '../calendar.module.css';
import { getColor } from '../../../utils/constants';

export const TaskForm = ({
  title = '',
  description = '',
  pri = 0,
  id = '',
  setIsRedact,
  updateTask,
  isAdding = false,
  setIsAdding = () => {},
  addTask = () => {},
}) => {
  const [titleValue, setTitleValue] = useState(title);
  const [titleDesc, setTitleDesc] = useState(description);
  const [priValue, setPriValue] = useState(pri);
  const [error, setError] = useState(false);

  const cancelEdit = () => {
    if (!isAdding) {
      setTitleValue(title);
      setTitleDesc(description);
      setIsRedact(false);
    } else {
      setIsAdding(false);
    }
  };

  const handleUpdateTask = () => {
    const updatedTask = {
      id: id,
      title: titleValue,
      description: titleDesc,
      pri: priValue,
    };
    if (!titleValue) {
      setError(true);
      return
    }
    if (!isAdding) {
      setIsRedact(false);
      updateTask(updatedTask);
    } else {
      addTask(updatedTask);
      setIsAdding(false);
    }
  };

  return (
    <div className={s.redact}>
      <div className={s.redactInfo}>
        <input
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder="Название задачи"
        />
        <textarea
          type="text"
          value={titleDesc}
          onChange={(e) => setTitleDesc(e.target.value)}
          rows={1}
          placeholder="Описание задачи"
        />
      </div>
      <div>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={priValue}
            label=""
            onChange={(e) => setPriValue(e.target.value)}
            displayEmpty
          >
            <MenuItem disabled value="Приоритет">
              <em>Приоритет</em>
            </MenuItem>
            <MenuItem value={0}>
              <span
                className={s.priority}
                style={{ backgroundColor: getColor(0) }}
              ></span>
              Низкий
            </MenuItem>
            <MenuItem value={1}>
              <span
                className={s.priority}
                style={{ backgroundColor: getColor(1) }}
              ></span>
              Средний
            </MenuItem>
            <MenuItem value={2}>
              <span
                className={s.priority}
                style={{ backgroundColor: getColor(2) }}
              ></span>
              Высокий
            </MenuItem>
            <MenuItem value={3}>
              <span
                className={s.priority}
                style={{ backgroundColor: getColor(3) }}
              ></span>
              Критичный
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={s.redactActions}>
        <Button size="small" variant="outlined" onClick={() => cancelEdit()}>
          Отменить
        </Button>
        <Button size="small" variant="contained" onClick={handleUpdateTask}>
          Сохранить
        </Button>
      </div>
      {error && (
        <div className={s.error}>
          <Alert onClose={() => setError(false)} severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            Заполните название
          </Alert>
        </div>
      )}
    </div>
  );
};
