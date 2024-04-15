import { useState } from 'react'
import './App.css'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element = {< Dashboard/>}/>
          {/* <Route path=''/> */}
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
