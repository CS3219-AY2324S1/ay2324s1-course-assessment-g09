
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'sadlyharry',
  applicationName: 'question-scraper',
  appUid: '000000000000000000',
  orgUid: '000000000000000000',
  deploymentUid: 'undefined',
  serviceName: 'question-scraper',
  shouldLogMeta: false,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '7.0.3',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'question-scraper-dev-getQuestions', timeout: 20 };

try {
  const userHandler = require('./serverless.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}