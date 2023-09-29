const scraper = require('./scraper');

module.exports.getQuestions = async (event) => {
  const qnData = await scraper.webScrapper();
  return {
    statusCode: 200,
    body: qnData,
  };
};
