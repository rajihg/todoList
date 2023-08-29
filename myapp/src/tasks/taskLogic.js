import * as taskService from '../services/taskService';

export function addOrEditTask(task, resetForm) {
    if (task.id === '0') {
      taskService.insertTask(task);
    } else {
      taskService.updateTask(task);
    }
    resetForm();
  }
  
  export function deleteTask(task) {
    taskService.deleteTask(task);
  }