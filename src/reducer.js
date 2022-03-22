import React from 'react'

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    const { taskID, taskName, taskPriority } = action.payload
    const task = {
      taskID: taskID,
      taskName: taskName,
      taskPriority: taskPriority,
    }
    return { ...state, tasks: [...state.tasks, task] }
  }

  if (action.type === 'EDIT_TASK') {
    const itemToEdit = state.tasks.find(
      (task) => task.taskID === action.payload.taskID
    )
    console.log(itemToEdit)
    return { ...state, tempSelectedTask: itemToEdit }
  }

  if (action.type === 'UPDATE_TASK') {
    const {
      payload: {
        taskToUpdate: { taskID, taskName, taskPriotirhy },
      },
    } = action
    // const { taskID, taskName, taskPriority } = action.payload.taskToUpdate
    const tempTaskList = state.tasks.map((task, index) => {
      if (task.taskID === taskID) {
        task.taskName = taskName
        task.taskPriority = taskPriority
        return task
      }
      return task
    })
    return { ...state.tasks, tasks: tempTaskList }
  }

  if (action.type === 'COMPLETED_TASK' || action.type === 'REMOVE_TASK') {
    const tempTask = state.tasks.filter(
      (task) => task.taskID !== action.payload
    )
    return { ...state, tasks: tempTask }
  }
  return { ...state }
}

export { reducer }
