
import './App.css'
import AppLayout from './layouts/App';
import DashboardLayout from './layouts/Dashboard';
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/Not-Found';
import Login from './pages/auth/Login';
import Booking from './pages/Booking';
import AddHotel from './pages/forms/hotel/AddHotel';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<AppLayout/>}>
          <Route path='/login' element={<Login/>}/>
        </Route>

        <Route path='/' element={<DashboardLayout/>}>
         <Route index element={<Dashboard/>}/>
         <Route path="/booking" element={<Booking/>}/>
         <Route path="/add-hotel" element={<AddHotel/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}/>
      
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
