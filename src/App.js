import './App.css';
import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import { submitPrompt } from './api/sentiments';

function App() {
  const [answer, setAnswer] = useState(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {

    async function getAnswer(prompt) {
      const newAnswerObj = await submitPrompt(prompt);
      newAnswerObj.status === 200 && setAnswer(newAnswerObj.data.answer);
      newAnswerObj.status !== 200 && setAnswer('Error, try again later.');
    }

    if (prompt) {
      setAnswer("");
      getAnswer(prompt);
    }

  }, [prompt]);


  const handlePromptEnter = (event) => {
    if (event.key === "Enter") {
      setPrompt(event.target.value);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">C3PO Prompt</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onKeyUp={handlePromptEnter}
            startAdornment={<InputAdornment position="start">{">>>>"}</InputAdornment>}
            label="C3PO Prompt"
          />
        </FormControl>
        {answer === null && <p>
          <code>Type your C3PO prompt and hit enter</code>
        </p>}
        {answer === "" && <p>
          <code>Loading...</code>
        </p>}
        {answer && <p>
          <code>{answer}</code>
        </p>}
      </header>
    </div>
  );
}

export default App;
