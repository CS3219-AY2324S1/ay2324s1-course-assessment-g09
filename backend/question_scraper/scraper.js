const axios = require("axios");
const puppeteer = require("puppeteer");
//const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const getBasicData = async (questionId) => {
    // Extract ID, Title, Difficulty and Question URL.
    const questionSrc = "https://leetcode.com/api/problems/all/";
    const response = await axios.get(questionSrc);
    const responseData = response.data;

    const question = (responseData.stat_status_pairs
        .filter(qn => qn.stat.question_id === questionId) // Only the intended question
        .filter(qn => qn.paid_only === false))[0]; // Only the first element of the array, Remove duplicates
    
    if (question === undefined) {
        throw new Error(`No question with ID ${questionId} found.`);
    }
    
    const difficultyMapping = ['Easy', 'Medium', 'Hard'];
    
    const questionTitle = question.stat.question__title;
    const questionDifficulty = difficultyMapping[question.difficulty.level];
    const questionUrl = "https://leetcode.com/problems/".concat(question.stat.question__title_slug);
    return {
        'qn_num': questionId,
        'title': questionTitle,
        'complexity': questionDifficulty,
        'url': questionUrl,
    };
}  

const getMoreData = async (question) => {
    // Extract and Append Category Tags and Description.
    /*
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: "new",
        ignoreHTTPSErrors: true,
    });
    */
    const browser = await puppeteer.launch({
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
    return question;
};

const getQuestion = async (questionId) => {
    const basicQuestionData = await getBasicData(questionId);
    const questionData = await getMoreData(basicQuestionData);
    return questionData;
};

const pushQuestion = async (question) => {
    const SERVER = process.env.SERVER;
    const url = `http://${SERVER}:3001/questions/create`;

    const qnData = {            
        "qn_num": question.qn_num,
        "title": question.title,
        "description": question.description,
        "category": question.category,
        "complexity": question.complexity
        //"url": question.url, // Not needed for now.
    };
    await axios.post(url, qnData);
    return question.title;
}

const scrape = async (questionId) => {
    const question = await getQuestion(questionId);
    console.log(question);
    const questionTitle = await pushQuestion(question);
    console.log(`Question '${questionTitle}' Successfully Pushed to Question Service`);
    return questionTitle;
}

module.exports = {
    scrape
}