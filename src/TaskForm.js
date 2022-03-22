import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from './context'
import TaskList from './TaskList'

const TaskForm = () => {
  const { addTask, tempSelectedTask, updateTask } = useGlobalContext()
  const refTaskName = useRef(null)
  const refTaskPriority = useRef(null)
  const [taskName, setTaskName] = useState('')
  const [taskPriority, setTaskPriority] = useState('1')
  const [isEditing, setIsEditing] = useState(false)
  const [priorities, setPriorities] = useState(['1', ' 2', '3', '4', '5'])

  const handleSubmit = (e) => {
    e.preventDefault()
    let task = {
      taskName: refTaskName.current.value,
      taskPriority: refTaskPriority.current.value,
    }
    if (isEditing) {
      task.taskID = tempSelectedTask.taskID
      updateTask(task)
      setIsEditing(false)
    } else {
      const d = new Date()
      task.taskID = d.getDate().toString() + d.getTime().toString()
      addTask(task)
    }
    setTaskName('')
    setTaskPriority('1')
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.name === 'task') setTaskName(refTaskName.current.value)
    else setTaskPriority(refTaskPriority.current.value)
  }

  useEffect(() => {
    if (tempSelectedTask) {
      console.log('use effect called')
      setIsEditing(true)
      console.log('use effect task name', tempSelectedTask.taskName)
      console.log(refTaskName.current.setValue)
      setTaskName(tempSelectedTask.taskName)
      setTaskPriority(tempSelectedTask.taskPriority)
    }
  }, [tempSelectedTask])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='task'>Task: </label>
        <input
          type='text'
          id='task'
          name='task'
          value={taskName}
          ref={refTaskName}
          onChange={handleChange}
        ></input>
        <select
          id='priority'
          ref={refTaskPriority}
          value={taskPriority}
          name='priority'
          onChange={handleChange}
        >
          {priorities.map((priority, index) => {
            return (
              <option key={index} value={priority}>
                {priority}
              </option>
            )
          })}
        </select>
        <button type='submit' id='submit_btn'>
          {isEditing ? 'Update task' : 'Add Task'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
