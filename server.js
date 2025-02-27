const express = require('express');
const fs = require('fs');
const cors = require('cors'); // <-- require CORS
const app = express();
const port = 3000;

app.use(cors()); // <-- enable CORS

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Endpoint to get the riddle of the day
app.get('/api/riddle', (req, res) => {
  fs.readFile('riddles.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading Ryddles.' });
      return;
    }
    const riddles = JSON.parse(data);
    const today = getTodayDate();
    // Find the riddle that matches today's date
    const riddleOfTheDay = riddles.find(riddle => riddle.date === today);
    if (riddleOfTheDay) {
      res.json(riddleOfTheDay);
    } else {
      res.status(404).json({ error: 'No Rydle for today.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
