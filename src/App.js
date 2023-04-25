import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { Dashboard } from 'components/Dashboard/Dashboard';

function App() {

  return (
    <>
      <CssBaseline />
      <Dashboard />
    </>
  );
}

export default App;
