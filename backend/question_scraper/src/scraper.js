const axios = require("axios");
const puppeteer = process.env.isDeployment == "true" ? require("puppeteer-core") : require("puppeteer");
const chromium = require("@sparticuz/chromium");

const getBasicData = async (questionId) => {
    // Extract ID, Title, Difficulty and Question URL.
    const questionSrc = "https://leetcode.com/api/problems/all/";
    const responseData = await axios.get(questionSrc).then(response => response.data);

    let question;
    for (qn of responseData.stat_status_pairs) {
        if (qn.stat.question_id == questionId && qn.paid_only == false) {
            question = qn;
            break;
        }
    }
    
    if (question === undefined) {
        throw new Error(`No question with ID ${questionId} found.`);
    }
    
    const difficultyMapping = ['Easy', 'Medium', 'Hard'];
    
    const questionTitle = question.stat.question__title;
    const questionDifficulty = difficultyMapping[question.difficulty.level-1];
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
    const browserOptions = (process.env.isDeployment == "true" 
        ? {
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: "new",
            ignoreHTTPSErrors: true
        } : {
            headless: "new",
            ignoreHTTPSErrors: true
        });
    const browser = await puppeteer.launch(browserOptions); 
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

    page.close();
    browser.close();
    return question;
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
    axios.post(url, qnData); //Add await if questions are not added to QuestionService.
    return question.title;
}

const scrape = async (questionId) => {
    const question = await getBasicData(questionId).then(data => getMoreData(data));
    console.log(question);
    const questionTitle = await pushQuestion(question);
    console.log(`Question '${questionTitle}' Successfully Pushed to Question Service`);
    return questionTitle;
}

module.exports = {
    getBasicData, //For Testing
    getMoreData,
    pushQuestion,

    scrape
}