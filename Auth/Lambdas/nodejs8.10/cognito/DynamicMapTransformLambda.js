// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const { send, SUCCESS, ERROR } = require('cfn-response');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambdaHandler = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));
  const { RequestType, ResourceProperties: props = { } } = event;
  const { Entries: entries = [ ], AttributeName: attName } = props;

  switch(RequestType) {
    case 'Create':
    case 'Update':
      const result = { };
      for (let i = 0; i < entries.length; i++) {
        const { Key, Value } = entries[i]
        if (Key) {
          result[Key] = Value
        }
      }
      send(event, context, SUCCESS, { [attName]: result });
      break;
    case 'Delete':
      send(event, context, SUCCESS);
      break;
  }
};