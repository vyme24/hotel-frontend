
import './App.css'
import AppLayout from './layouts/App';
import Home from './pages/Home'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './pages/Not-Found';
import RoomAll from './pages/room/All';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/rooms' element={<RoomAll/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
