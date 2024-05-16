import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Chat from './Chat/Chat';
import Profile from './Profile/Profile';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Sala from './Sala/Sala';

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/salas" element={<Sala />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;