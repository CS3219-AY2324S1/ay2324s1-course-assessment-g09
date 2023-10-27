const axios = require("axios");
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const getBasicData = async (questionId) => {
    // Extract ID, Title, Difficulty and Question URL.
    const questionSrc = "https://leetcode.com/api/problems/all/";
    const responseData = await axios.get(questionSrc).then(response => response.data.stat_status_pairs);
    const question = responseData.filter(qn => qn.stat.question_id == questionId && qn.paid_only == false)[0];
    
    if (question === undefined) {
        throw new Error(`No question with ID ${questionId} found.`);
    }
    
    const difficultyMapping = ['Easy', 'Medium', 'Hard'];
    return {
        'qn_num': questionId,
        'title': question.stat.question__title,
        'complexity': difficultyMapping[question.difficulty.level-1],
        'url': "https://leetcode.com/problems/".concat(question.stat.question__title_slug),
    };
}  

const getMoreData = async (question) => {
    // Extract and Append Category Tags and Description.
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: "new",
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(question.url);

    await page.waitForSelector('a.mr-4'); // wait for the tags element to load
    await page.waitForSelector('.xFUwe'); // wait for the content element to load   

    const data = await page.evaluate(() => {  
        //Extract tags          
        const tagElems = document.querySelectorAll('a.mr-4');
        const tags = Array.from(tagElems).map(element => element.textContent).toString(); //Use JSON.parse to convert from String to Array.

        //Extract description
        const description = document.querySelector('.xFUwe').innerHTML;
        return {tags, description}
    })
    question.category = data.tags;
    question.description = data.description;

    await page.close();
    await browser.close();
    return question;
};

const pushQuestion = async (question) => {
    const qnData = {            
        "qn_num": question.qn_num,
        "title": question.title,
        "description": question.description,
        "category": question.category,
        "complexity": question.complexity
        //"url": question.url, // Not needed for now.
    };
    await axios.post(process.env.SERVER, qnData); //Add await if questions are not added to QuestionService.
    return question.title;
}

const scrape = async (questionId) => {
    const question = await getBasicData(questionId).then(data => getMoreData(data));
    //console.log(question);
    const questionTitle = await pushQuestion(question);
    //console.log(`Question '${questionTitle}' Successfully Pushed to Question Service`);
    return questionTitle;
}

module.exports = {
    scrape
};