import React, { useEffect, useState } from 'react';
import s from '../calendar.module.css';
import {
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import autosize from '../../../resize';
import { TaskForm } from './TaskForm';
import { getColor, monthes } from '../../../utils/constants';
import dayjs from 'dayjs';

export const TaskItem = ({
  title,
  description,
  pri,
  id,
  date,
  updateTask,
  deleteTask,
  task,
  done
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isRedact, setIsRedact] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDone, setIsDone] = useState(done)

  console.log(done, 'done')

  const colorForDate = new Date() > new Date(date) ? 'red' : '';

  const updateTaskStatus = (e) => {
    setIsDone(!isDone)
    updateTask({...task, done: !done})
  }

  // useEffect(() => {
  //   console.log(isDone, 'isDone')
  // }, [isDone])

  const openModal = () => {
    setOpen(true);
  };

  autosize(document.querySelectorAll('textarea'));

  return (
    <>
      {isRedact ? (
        <TaskForm
          title={title}
          description={description}
          pri={pri}
          id={id}
          updateTask={updateTask}
          setIsRedact={setIsRedact}
          date={date}
        />
      ) : (
        <div className={s.item}>
          {done && <div className={s.done}></div>}
          <div className={s.itemHead}>
            <div
              className={s.priority}
              style={{ backgroundColor: getColor(pri) }}
            ></div>
            <div style={{textDecoration: done ? 'line-through' : ''}}>
              <div>{title}</div>
            </div>
            <div className={s.actions}>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ color: 'black' }}
              >
                <ExpandMoreIcon
                  style={{ transform: expanded ? 'rotate(180deg)' : '' }}
                />
              </IconButton>
              <IconButton
                style={{ color: 'black' }}
                onClick={() => setIsRedact(!isRedact)}
              >
                <EditIcon style={{ cursor: 'pointer' }} />
              </IconButton>
              <IconButton onClick={openModal} style={{ color: 'black' }}>
                <DeleteOutlineIcon style={{ cursor: 'pointer' }} />
              </IconButton>
            </div>
          </div>
          <div className={s.description}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <p>{description}</p>
            </Collapse>
          </div>
          <div className={s.bottom}>
            <div className={s.dueDate} style={{ color: colorForDate }}>
              {new Date(date).getDate()} {monthes[new Date(date).getMonth()]}
            </div>
            <Checkbox style={{zIndex: '101'}} checked={done} onChange={() => updateTaskStatus()} />
          </div>
          <Dialog
            open={open}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Вы точно хотите удалить задачу ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Нет</Button>
              <Button onClick={() => deleteTask(id)}>Да</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};
