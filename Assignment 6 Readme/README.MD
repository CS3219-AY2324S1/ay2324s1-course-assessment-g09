# Assignment 6 Readme

## Setup:

1. Install and Download Postman Desktop.

## To Test Implementation:

1. Send a POST request on https://30dfcbhob1.execute-api.ap-southeast-1.amazonaws.com/scrapeQuestion/{leetcode_qn_id}. You may use Postman Desktop. Replace {leetcode_qn_id} with the Question ID of your favourite LeetCode question. For example, the 'Two Sum' problem has the Leetcode Question ID of 1. 

2. Wait till the POST request returns a Success Message. Note that there may be errors, if the invocation to the serverless function was a cold start.

3. Access PeerPrep via this link http://a34b5b20ab2724775b6deac2de10363b-f5e838cbca67e6d1.elb.ap-southeast-1.amazonaws.com/.

4. Login as an Admin as such: Email: admin@peerprep.com, Password:12345678. These credentials are for testing purposes only.

5. Verify that the question of that Leetcode Question ID exists on the question list!
