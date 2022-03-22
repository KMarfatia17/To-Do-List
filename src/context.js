import React, { createContext, useContext, useState } from 'react'
import { useReducer } from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const initialState = {
  tasks: [],
  tempSelectedTask: null,
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addTask = ({ taskID, taskName, taskPriority }) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskID: taskID,
        taskName: taskName,
        taskPriority: taskPriority,
      },
    })
  }

  const editTask = (taskID) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskID,
      },
    })
  }

  const updateTask = (taskToUpdate) => {
    // const { taskID, taskName, taskPriority } = TaskToUpdate
    dispatch({
      type: 'UPDATE_TASK',
      payload: { taskToUpdate },
    })
  }

  const removeTask = (taskID) => {
    dispatch({ type: 'REMOVE_TASK', payload: taskID })
  }

  const completedTask = (taskID) => {
    dispatch({ type: 'COMPLETED_TASK', payload: taskID })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addTask,
        editTask,
        updateTask,
        removeTask,
        completedTask,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
