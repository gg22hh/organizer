import React, { useEffect, useState } from 'react';
import s from './calendar.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TaskItem } from './components/TaskItem';
import { days, monthes, data } from '../../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { TaskForm } from './components/TaskForm';

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasksData, setTasksData] = useState(data);
  const [isAdding, setIsAdding] = useState(false);

  setTimeout(() => {
    setDate(new Date());
  }, 1000);

  const addTask = (newTask) => {
    setTasksData([...tasksData, { ...newTask, id: new Date().getTime() }]);
  };

  const updateTask = (item) => {
    const tasksDataCopy = [...tasksData];
    const newTasksData = tasksDataCopy.map((task) => {
      console.log(task);
      if (task.id === item.id) return item;
      return task;
    });
    console.log(newTasksData);
    setTasksData(newTasksData);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasksData.filter((task) => task.id !== id)
    setTasksData(updatedTasks)
  }

  const tasksList = tasksData.map((task) => (
    <TaskItem key={task.id} {...task} updateTask={updateTask} deleteTask={deleteTask} />
  ));

  return (
    <div className={s.container}>
      <div>
        <div className={s.date}>
          <div>{date.toLocaleTimeString()}</div>
          <div>
            {date.getDate()} {monthes[date.getMonth()]}, {days[date.getDay()]}
          </div>
        </div>
        <LocalizationProvider
          style={{ margin: '0' }}
          dateAdapter={AdapterDayjs}
        >
          <DateCalendar />
        </LocalizationProvider>
      </div>
      <div style={{ width: '100%' }}>
        <div className={s.list}>
          {tasksList}
          {isAdding && (
            <TaskForm
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              addTask={addTask}
            />
          )}
        </div>
        <IconButton className={s.add} onClick={() => setIsAdding(true)}>
          <AddIcon />
          <span>Добавить задачу</span>
        </IconButton>
      </div>
    </div>
  );
};
