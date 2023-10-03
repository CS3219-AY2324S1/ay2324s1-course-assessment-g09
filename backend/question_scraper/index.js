// import axios from "axios";
const puppeteer = require('puppeteer');
const axios=require('axios');

(async () => {
    const res = await axios.get("https://leetcode.com/api/problems/algorithms/")
    data = res.data;

    freeQns = data.stat_status_pairs.filter(each_qns => each_qns.paid_only === false);
    // question_slug = freeQns[Math.floor(Math.random() * freeQns.length) + 1].stat.question__title_slug
    question_slug = freeQns[0].stat.question__title_slug
    
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });

    const page = await browser.newPage();
    
    // await page.goto(`https://leetcode.com/problems/validate-binary-search-tree`);
    await page.goto(`https://leetcode.com/problems/${question_slug}`);

    const titleSelector = '#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.w-full.px-5.pt-5 > div > div:nth-child(1) > div.flex-1 > div > a'
    let title;

    try {
        await page.waitForSelector(titleSelector);
        
        // Use page.$eval() to get the outerHTML of the <a> element
        title = await page.$eval(titleSelector, (anchor) => anchor.textContent);
    
        console.log(`Difficulty: ${title}`);
      } catch (error) {
        console.error(`Anchor not found: ${error}`);
      }

      const difficultySelector = '#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.w-full.px-5.pt-5 > div > div.mt-3.flex.items-center.space-x-4 > div'
      let difficulty;
      

      try {
        await page.waitForSelector(difficultySelector);

        difficulty = await page.$eval(difficultySelector, (anchor) => anchor.textContent);
        console.log(difficulty);
      } catch (error) {
        console.log("Error");
      }

      const contentSelector = '#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.px-5.pt-4 > div.xFUwe'
      let content;

      try {
        await page.waitForSelector(contentSelector);

        content = await page.$$eval(contentSelector, el => {
            // el.textContent
            return el.map((p) => p.textContent.trim()).join('\n');
        });
        console.log(content);
      } catch (error) {
        console.error(error);
      }

    
})();