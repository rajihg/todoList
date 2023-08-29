import React, { useEffect, useState } from 'react'
import TasksForm from './TasksForm'
import Popup from '../components/Popup';
import { Paper, makeStyles, Toolbar, InputAdornment, Card, Typography, CardContent } from '@material-ui/core';
import Button from '../components/Button';
import * as taskService from '../services/taskService';
import { Search } from "@material-ui/icons";
import SearchBox from '../components/SearchBox';
import AddIcon from '@material-ui/icons/Add';
import PageHeader from '../components/PageHeader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import useCard from '../components/useCard';
import TaskCard from '../components/TaskCard';
import DisplayMap from '../components/DisplayMap';
import { useTaskContext } from './TaskContext';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '15px',
    marginLeft: '38px'
  },
}))

export default function Tasks() {
  const classes = useStyles();
  
  const {
    records,
    setRecords,
    openPopup,
    setOpenPopup,
    recordForEdit,
    setRecordForEdit,
    filterFn,
    setFilterFn,
  } = useTaskContext();

  const {
    getTasks
  } = useCard(records, filterFn);

   const addOrEdit = (task, resetForm) => {
    if (task.id == '0') {
      taskService.insertTask(task);
    }
    else {
      taskService.updateTask(task);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(taskService.getAllTasks());
  }

  const deleteTask = (task) => {
    taskService.deleteTask(task);
    setRecords(taskService.getAllTasks());
  }

  const onCompleteChange = (taskId, newCompleted) => {
    const updatedRecords = records.map(task => {
      if (task.id == taskId) {
        return { ...task, isCompleted: newCompleted ? 1 : 0 }
      }
      return task;
    })

    setRecords(updatedRecords);
  }

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items.filter(x => x.taskName.toLowerCase().includes(target.value))
      }
    })
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true);
  }

  return (
    <>
      <PageHeader
        title='Todo List'
        subTitle='Your way to complete tasks easily'
        icon={<AssignmentIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <SearchBox
            label='Search Tasks'
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search />
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />
          <Button
            text="Add Task"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpenPopup(true); setRecordForEdit(null) }}
          />
        </Toolbar>
      </Paper >
      <div className={classes.cardWrapper}>
        {
          getTasks().map(item => (
            <TaskCard
              key={item.id}
              task={item}
              onDelete={deleteTask}
              onEdit={openInPopup}
              onCompleteChange={onCompleteChange}
            />
          ))
        }
      </div>
      <div style={{ flex: 1 }}>
        <DisplayMap tasks={records} />
      </div>
      <Popup
        title='New Task Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TasksForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
    </>
  )
}
