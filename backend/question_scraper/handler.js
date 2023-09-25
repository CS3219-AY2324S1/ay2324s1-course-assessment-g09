const scraper = require('./scraper');

module.exports.getQuestions = async (event) => {
  
  const qnData = JSON.stringify(await scraper.webScrapper());

  return {
    statusCode: 200,
    body: qnData,
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
