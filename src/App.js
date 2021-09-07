import React from 'react'
import { ToastContainer } from 'react-toastify'
import WatherApp from './WatherApp'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <WatherApp />
      <ToastContainer />
    </div>
  )
}

export default App
