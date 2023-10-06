const axios = require("axios");
const puppeteer = require("puppeteer");

const webScrapper = async () => {
    
    const getQnData = async () => {
        const diffMapping = ['Easy', 'Medium', 'Hard'];
        const extractQnData = (qn) => {
            const qnId = qn.stat.question_id;
            const qnTitle = qn.stat.question__title;
            const qnDiff = diffMapping[qn.difficulty.level];
            const qnUrl = "https://leetcode.com/problems/".concat(qn.stat.question__title_slug);
            return {
                'id': qnId,
                'title': qnTitle,
                'difficulty': qnDiff,
                'url': qnUrl,
            };
        };

        const url = "https://leetcode.com/api/problems/all/";
        const response = await axios.get(url);
        const data = response.data;
        
        const qnsData = (data.stat_status_pairs
            .filter(qn => qn.paid_only === false))
            .map(qn => extractQnData(qn));
        return qnsData;
    }

    const addCatandDesc = async (qnsData) => {

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();    

        const qnsNewData = [];
        for (const qn of qnsData) {
            await page.goto(qn.url);

            await page.waitForSelector('.mt-2 .flex .flex-wrap .gap-y-3'); // wait for the tags elemenst to load
            await page.waitForSelector('.xFUwe'); // wait for the content element to load

            // Returns an object with the details of the question
            const getProblemDetail = await page.evaluate(() => {
                const question = document.querySelector('.items-center .text-lg')

                // text returns a string in the form  123. Title
                const text = question.textContent.trim()
                const parts = text.split(".")
                const number = parts[0]
                const title = parts[1]
                
                const arr = document.querySelectorAll('.overflow-hidden .mt-2 .mr-4')
                const tags = Array.from(arr).map(element => element.textContent);

                const url = document.URL

                const difficulty = document.querySelector('.space-x-4 .text-xs').textContent.trim()
                return {number, title, tags, url, difficulty}
            })

            problemsArray.push(getProblemDetail)
            await page.close()
            return problemsArray;
        }
    }

    try {
        const qnData = await getQnData();
        const qnDatas = await get();
        //console.log(qnDatas);
        //return JSON.stringify(qnDatas);
    } catch (error) {
        console.log("An error occurred", error);
    }
}
webScrapper();

//module.exports = {
//    webScrapper,
//};