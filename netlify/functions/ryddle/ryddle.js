const fs = require('fs/promises');

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

exports.handler = async (event, context) => {
  try {
    const data = await fs.readFile(__dirname + '/ryddles.json', 'utf8');
    const riddles = JSON.parse(data);

    const today = getTodayDate();
    const ryddleOfTheDay = riddles.find(r => r.date === today);

    if (ryddleOfTheDay) {
      return {
        statusCode: 200,
        body: JSON.stringify(ryddleOfTheDay),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No ryddle for today.' }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error reading ryddles.' }),
    };
  }
};
