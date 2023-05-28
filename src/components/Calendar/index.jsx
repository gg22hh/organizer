import React, { useEffect, useState } from 'react';
import s from './calendar.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TaskItem } from './components/TaskItem';
import { days, monthes, data, monthesBefore } from '../../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { TaskForm } from './components/TaskForm';
import dayjs from 'dayjs';
import loadingGif from '../../images/loading.gif';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasksData, setTasksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtredTasksData, setFiltredTasksData] = useState(tasksData);
  const [isAdding, setIsAdding] = useState(false);
  const [calValue, setCalValue] = useState();
  const [hideDoneTasks, setHideDoneTasks] = useState();
  const [sortType, setSortType] = useState(12);

  useEffect(() => {
    setIsLoading(true);
    const getTasks = async () => {
      const response = await fetch(
        'https://6303a6270de3cd918b3b3fda.mockapi.io/diplo'
      );
      if (response.ok) {
        const json = await response.json();
        setTasksData(json);
        setIsLoading(false);
      } else {
        console.log('error');
      }
    };
    getTasks();
  }, []);

  // setTimeout(() => {
  //   setDate(new Date());
  // }, 1000);

  useEffect(() => {
    setFiltredTasksData(tasksData);
  }, [tasksData]);

  useEffect(() => {
    if (calValue) {
      console.log(calValue?.toISOString());
      const filtredTasks = tasksData.filter(
        (task) => new Date(calValue?.toISOString()) > new Date(task.date)
      );
      setFiltredTasksData(filtredTasks);
    }
  }, [calValue, tasksData]);

  const resetFiltredTasksData = () => {
    setFiltredTasksData(tasksData);
    setCalValue();
  };

  const addTask = async (newTask) => {
    const taskToServer = { ...newTask, id: new Date().getTime() };
    const response = await fetch(
      'https://6303a6270de3cd918b3b3fda.mockapi.io/diplo/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToServer),
      }
    );

    if (response.ok) {
      const newTaskToServer = await response.json();
      setTasksData([...tasksData, newTaskToServer]);
    }
  };

  const updateTask = async (item) => {
    const response = await fetch(
      `https://6303a6270de3cd918b3b3fda.mockapi.io/diplo/${item.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }
    );

    if (response.ok) {
      const updateTaskFromServer = await response.json();
      setTasksData(
        tasksData.map((task) => {
          if (task.id === updateTaskFromServer.id) {
            return updateTaskFromServer;
          }

          return task;
        })
      );
    } else {
      console.log('Error');
    }
  };

  console.log(new Date(calValue?.toISOString()));

  const deleteTask = async (id) => {
    const response = await fetch(
      `https://6303a6270de3cd918b3b3fda.mockapi.io/diplo/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      setTasksData(tasksData.filter((task) => task.id !== id));
      resetFiltredTasksData();
    } else {
      console.log(`${response.status} - ${response.statusText}`);
    }
  };

  const handleHideDoneTasks = () => {
    if (!hideDoneTasks) {
      setFiltredTasksData(tasksData.filter((task) => !task.done));
    } else {
      setFiltredTasksData(tasksData.filter((task) => task.done));
    }
    setHideDoneTasks(!hideDoneTasks);
  };

  useEffect(() => {
    if (sortType === 'dataUp') {
      setFiltredTasksData(filtredTasksData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    } else if (sortType === 'dataDown') {
      setFiltredTasksData(filtredTasksData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else if (sortType === 'priUp') {
      setFiltredTasksData(filtredTasksData.sort((a, b) => b.pri - a.pri));
    } else if (sortType === 'priDown') {
      setFiltredTasksData(filtredTasksData.sort((a, b) => a.pri - b.pri));
    }
    setDate(new Date());
  }, [sortType, filtredTasksData]);

  const tasksList = filtredTasksData.map((task) => (
    <TaskItem
      key={task.id}
      {...task}
      task={task}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
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
          <DateCalendar
            value={dayjs(calValue)}
            onChange={(newValue) => setCalValue(newValue)}
          />
        </LocalizationProvider>
        {tasksData.some((task) => task.done) && (
          <Button
            style={{ margin: '0 auto 25px', display: 'block' }}
            variant="outlined"
            onClick={handleHideDoneTasks}
          >
            {!hideDoneTasks
              ? 'Скрыть завершенные задачи'
              : 'Показать завершенные задачи'}
          </Button>
        )}

        {tasksData.length !== filtredTasksData.length && (
          <Button
            className={s.add}
            variant="contained"
            onClick={() => resetFiltredTasksData()}
          >
            Показать все задачи
          </Button>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <div className={s.header}>
          <h1 className={s.title}>
            Ваши задачи
            {calValue &&
              ` до ${new Date(calValue?.toISOString())?.getDate()} ${
                monthesBefore[new Date(calValue?.toISOString())?.getMonth()]
              }`}
            :
          </h1>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 150 }}
            size="small"
          >
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              label="Сортировка"
            >
              <MenuItem disabled value={12}>
                <em>Сортировка</em>
              </MenuItem>
              <MenuItem value="dataUp">
                <div className={s.sortItem}>
                  Дедлайн <ArrowDropUpIcon />
                </div>
              </MenuItem>
              <MenuItem value="dataDown">
                <div className={s.sortItem}>
                  Дедлайн <ArrowDropDownIcon />
                </div>
              </MenuItem>
              <MenuItem value="priUp">
                <div className={s.sortItem}>
                  Приоритет <ArrowDropUpIcon />
                </div>
              </MenuItem>
              <MenuItem value="priDown">
                <div className={s.sortItem}>
                  Приоритет <ArrowDropDownIcon />
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {isLoading ? (
          <div className={s.loading}>
            <img src={loadingGif} alt="Loading..." />
          </div>
        ) : (
          <>
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
            <Button
              variant="contained"
              className={s.add}
              onClick={() => setIsAdding(true)}
            >
              <AddIcon />
              <span>Добавить задачу</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
