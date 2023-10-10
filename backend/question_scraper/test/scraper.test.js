const scraper = require('../src/scraper');
const axios = require("axios");

test('Positive Unit Test: GetBasicData', async () => {
    const input = 1; //Question id
    const expOutput = "Two Sum";

    // Setup: NA
    
    // Test
    await expect(
        scraper.getBasicData(input).then(data => data.title)
    ).resolves.toBe(
        expOutput
    );

    // Clean up: NA
});

test('Positive Unit Test: GetMoreData', async () => {
    const input = {
        'url': "https://leetcode.com/problems/two-sum",
    };
    const expOutput = "Array,Hash Table"

    // Setup: NA

    // Test
    await expect(
        scraper.getMoreData(input).then(data => data.category)
    ).resolves.toBe(
        expOutput
    );

    // Clean up: NA
}, 60000);

test('Positive Unit Test: PushQuestion', async () => {
    const input = {  
        "qn_num": -1,
        "title": "TestTitle",
        "description": "TestDescription",
        "category": "TestCat",
        "complexity": "TestComplexity"
    };
    const expOutput = input.title;

    // Setup
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input.qn_num}`).catch(()=> {}); // Delete remains of test.

    // Unit Test
    await expect(
        scraper.pushQuestion(input)
    ).resolves.toBe(
        expOutput
    );

    // Clean up
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input.qn_num}`); // Delete remains of test.
}, 60000);

test('Positive Integration Test: PushQuestion', async () => {
    const input = {  
        "qn_num": -1,
        "title": "TestTitle",
        "description": "TestDescription",
        "category": "TestCat",
        "complexity": "TestComplexity"
    };

    // Setup
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input.qn_num}`).catch(()=> {});; // Delete remains of test.
    await scraper.pushQuestion(input);

    // Integration Test: Test if Question is truly in DB.
    await expect(
        axios.get(`http://${process.env.SERVER}:3001/questions/get/${input.qn_num}`).then(resp => resp.data.qn.qn_num)
    ).resolves.toBe(
        input.qn_num
    );

    // Clean up.
    axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input.qn_num}`);
}, 60000);

test('Positive Unit Test: Scrape', async () => {
    const input = 123; // Assuming this qn has never been added!
    const expOutput = "Best Time to Buy and Sell Stock III";
    
    // Setup 
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input}`).catch(()=> {}); // Delete old remains of test.
    
    // Test
    await expect(
        scraper.scrape(input)
    ).resolves.toBe(
        expOutput
    );

    // Clean up
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input}`); // Delete remains of test.
}, 60000);

test('Positive Integration Test: Scrape', async () => {
    const input = 123; // Assuming this qn has never been added!

    // Setup
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input}`).catch(()=> {}); // Delete remains of test.
    await scraper.scrape(input);

    // Difficult Test: Test if Question is truly in DB.
    await expect(
        axios.get(`http://${process.env.SERVER}:3001/questions/get/${input}`).then(resp => resp.data.qn.qn_num)
    ).resolves.toBe(
        input
    );

    //Clean up.
    await axios.post(`http://${process.env.SERVER}:3001/questions/delete/${input}`);
}, 60000);
