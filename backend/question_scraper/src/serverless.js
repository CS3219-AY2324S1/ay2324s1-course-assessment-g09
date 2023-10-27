const scraper = require('./scraper');

module.exports.handler = async (event) => {
  try {
    const questionId = parseInt(event.pathParameters.id);
    if (isNaN(questionId)) {
      throw new Error('Question Number must be an integer.');
    };
    
    const questionTitle = await scraper.scrape(questionId);
    const msg = `Question '${questionTitle}' Successfully Scraped and Pushed to Question Service`;
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        msg: msg,
      }),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        msg: error.message,
      }),
    };
    return response;
  }
};