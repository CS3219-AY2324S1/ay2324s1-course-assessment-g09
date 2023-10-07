const scraper = require('./scraper');

module.exports.handler = async (event) => {
  try {
    const questionId = 1;//parseInt(event.pathParameters.id);
    const questionTitle = await scraper.scrape(questionId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: `Question '${questionTitle}' Successfully Scraped and Pushed to Question Service`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: error.message,
      }),
    };
  }
};