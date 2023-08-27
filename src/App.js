import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import HomePage from './pages/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage/>} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
