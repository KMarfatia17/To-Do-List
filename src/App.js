import logo from './logo.svg'
import './App.css'
import TaskForm from './TaskForm'
import { Fragment, useState } from 'react'
import { useGlobalContext } from './context'

function App() {
  const { tasks } = useGlobalContext()
  return (
    <Fragment>
      <TaskForm />
      {tasks.length >= 1 && <TaskList />}
    </Fragment>
  )
}

export default App
