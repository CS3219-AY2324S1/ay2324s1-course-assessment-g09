const scraper = require('./scraper');

const getQuestions = async (event) => {
  //Step 1. Scrape qn data  
  //Step 3. Push to QuestionService.
}; 


module.exports.getQuestions = async (event) => {
  const qnData = await scraper.webScrapper();
  return {
    statusCode: 200,
    body: qnData,
  };
};
