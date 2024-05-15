import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Chat from './Chat/Chat';
import Profile from './Profile/Profile';

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;