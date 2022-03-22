import React from 'react'
import { useGlobalContext } from './context'

const TaskList = () => {
  const { tasks, editTask, removeTask, completedTask } = useGlobalContext()

  return (
    <main>
      {tasks.map((task, index) => {
        const { taskID, taskName, taskPriority } = task
        return (
          <article key={taskID}>
            <p>{taskName}</p>
            <p>{taskPriority}</p>
            <button type='button' onClick={() => editTask(taskID)}>
              Edit
            </button>
            <button
              type='button'
              onClick={() => {
                completedTask(task.taskID)
              }}
            >
              completed
            </button>
            <button type='button' onClick={() => removeTask(task.taskID)}>
              Remove
            </button>
          </article>
        )
      })}
    </main>
  )
}

export default TaskList
