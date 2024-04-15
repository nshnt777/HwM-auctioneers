import './App.css'
import Dashboard from './Pages/Dashboard.jsx'
import Signup from './Pages/Signup.jsx'
import Product from './Pages/Product.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BiddingLobby from './Pages/BiddingLobby.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element = {< Dashboard/>}/>
          <Route path='/product' element = {<Product prodId={"1"}/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/bidding' element={<BiddingLobby prodId={"1"}/>} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
