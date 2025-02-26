const fs = require('fs/promises');

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

exports.handler = async (event, context) => {
  try {
    // Read riddles.json
    const data = await fs.readFile(__dirname + '/riddles.json', 'utf8');
    const riddles = JSON.parse(data);

    const today = getTodayDate();
    const riddleOfTheDay = riddles.find(r => r.date === today);

    if (riddleOfTheDay) {
      return {
        statusCode: 200,
        body: JSON.stringify(riddleOfTheDay),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No riddle for today.' }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error reading riddles.' }),
    };
  }
};
