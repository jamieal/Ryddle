const fs = require('fs/promises');

exports.handler = async (event, context) => {
  try {
    // Read the date from the query string: ?date=2025-02-25
    const dateParam = event.queryStringParameters?.date;

    if (!dateParam) {
      // If no date provided, return an error or handle as you wish
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No date provided.' })
      };
    }

    const data = await fs.readFile(__dirname + '/ryddles.json', 'utf8');
    const ryddles = JSON.parse(data);

    // Find the matching date
    const ryddleOfTheDay = ryddles.find(r => r.date === dateParam);

    if (ryddleOfTheDay) {
      return {
        statusCode: 200,
        body: JSON.stringify(ryddleOfTheDay),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `No ryddle for date ${dateParam}.` }),
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
