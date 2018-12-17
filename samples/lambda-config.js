module.exports = {
  region: 'us-east-1',
  handler: 'index.handler',
  role: 'arn:aws:iam::...',
  timeout: 10,
  memorySize: 1024,
  publish: false,
  runtime: 'nodejs8.10',
  functionName: 'AlexaJokes'
};
