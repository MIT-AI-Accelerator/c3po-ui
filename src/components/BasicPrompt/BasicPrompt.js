import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';

import { submitPrompt } from '../../api/sentiments/sentiments';

export function BasicPrompt() {
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
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <div>
          <FormControl fullWidth sx={{ ml: 0, mr: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Stress Gauge</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              onKeyUp={handlePromptEnter}
              startAdornment={<InputAdornment position="start">{">>>"}</InputAdornment>}
              label="C3PO Prompt"
            />
          </FormControl>
          {answer === null && <p>
            <code>Type a message to view stress level</code>
          </p>}
          {answer === "" && <p>
            <code>Loading...</code>
          </p>}
          {answer && <p>
            <code>{answer}</code>
          </p>}
        </div>
      </Paper>
  );
}




