const axios = require("axios")

const lc_endpt_api = "https://leetcode.com/api/problems/algorithms/";
const lc_base_url = "https://leetcode.com/problems/";

const scrap = async () => {
    const axiosResponse = await axios.request({
        method: "GET",
        url: lc_endpt_api,
        headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}
    })
    const allQns = axiosResponse.data.stat_status_pairs
    const qnUrls = (
        allQns
        .filter((qn) => qn.paid_only) // Filter out paid questions
        .map((qn) => qn.stat.question__title_slug) // Get title slug
        .map((slug) => lc_base_url + slug) // Make leetcode urls.
    );
    // Next step: Filter pure html from the response. 
    // Store in our database.
};

//scrape(); Stop deployment for now.

module.exports.getQuestions = (event, context, callback) => {
    callback(null, 'Hello world');
}