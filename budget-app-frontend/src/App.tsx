import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EditExpense from './components/EditExpense';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/edit" element={<EditExpense />} />
      </Routes>
    </Router>
  );
};

export default App;