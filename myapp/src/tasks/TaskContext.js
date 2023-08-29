import React, { createContext, useContext, useState } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [records, setRecords] = useState(taskService.getAllTasks());
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => items });

  return (
    <TaskContext.Provider
      value={{
        records,
        setRecords,
        openPopup,
        setOpenPopup,
        recordForEdit,
        setRecordForEdit,
        filterFn,
        setFilterFn,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
