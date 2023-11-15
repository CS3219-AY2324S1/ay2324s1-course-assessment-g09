# Question Scraper

This Serverless Function scrapes a question from Leetcode to insert into the deployed Question Service.

HTTP Status 200 means the operation completed successfully. Or else, HTTP Status 500 mean the operation faced some error.

## How to use?

POST https://30dfcbhob1.execute-api.ap-southeast-1.amazonaws.com/scrapeQuestion/<question_num>

Question Scraper will scrape the Leetcode question belonging to this <question_num>.

For example. <question_num> of 1 represents "1. Two Sum".

## How to deploy?

(Currently, deployment credentials are with Choon Yong)

1. ```serverless login```: Connect to AWS account and Serverless Dashboard. 
2. ```npm install```: Install dependencies
2. ```serverless invoke local --function scrapeQuestion```: Test the Serverless Function locally. Note: Remember to switch to the local version of Puppeteer.
3. ```serverless deploy --stage dev --region ap-southeast-1```: Deploy the Serverless Function to AWS Lambda. Avoid changing the 'stage' and 'region', as it may initialise additional resources and incur more $$.

After running deploy, you should see output similar to:

```bash
Deploying question-scraper to stage development (ap-southeast-1)
✔ Your AWS account is now integrated into Serverless Framework Observability
✔ Serverless Framework Observability is enabled

✔ Service deployed to stack question-scraper-development (92s)

dashboard: ***
endpoint: POST - https://30dfcbhob1.execute-api.ap-southeast-1.amazonaws.com/scrapeQuestion/<question_num>
functions:
  scrapeQuestion: question-scraper-development-scrapeQuestion (70 MB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).
