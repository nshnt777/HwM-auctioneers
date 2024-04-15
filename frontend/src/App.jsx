import './App.css'
import Dashboard from './Pages/Dashboard.jsx'
import Signup from './Pages/Signup.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element = {< Dashboard/>}/>
          {/* <Route path='/product' element = {<Product />}/> */}
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
