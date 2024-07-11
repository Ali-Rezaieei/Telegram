import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OutletProvider } from './OutletContext';
import AppRouter from './AppRouter'; // Your main router component
import LoginPage from './components/LoginPage'; // Your login page component

const App = () => {
  
  return (
    <Router>
      <OutletProvider>
        <AppRouter />
      </OutletProvider>
    </Router>
  );
};

export default App;
