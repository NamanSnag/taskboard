import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignUp, Login, Home, LandingPage } from "./pages";
import {Navbar } from './components';


function App() {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' exact element={<LandingPage/>} />
        <Route path='/register' exact element={<SignUp/>} />
        <Route path='/login' exact element={<Login setUser={setUser} />} />
        {
          user && <Route path='/home' exact element={<Home />} />
        }
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
