import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Chat from './Chat/Chat';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import Registro from './Registro/Registro'

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route exact path="/" element={<Homepage />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
