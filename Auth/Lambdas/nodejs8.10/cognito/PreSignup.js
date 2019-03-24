// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let util = require('util');

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
    //console.log("BEFORE(PreSignup): " + JSON.stringify(util.inspect(event, {depth: null})));
    console.log("BEFORE(PreSignup): ");
    console.log(JSON.stringify(event, null, 0));

    
    // // Confirm the user
    // event.response.autoConfirmUser = false;

    // // Set the email as verified if it is in the request
    // if (event.request.userAttributes.hasOwnProperty("email")) {
    //     event.response.autoVerifyEmail = false;
    // }

    // // Set the phone number as verified if it is in the request
    // if (event.request.userAttributes.hasOwnProperty("phone_number")) {
    //     event.response.autoVerifyPhone = false;
    // }

    //console.log("AFTER(PreSignup: " + util.inspect(event, {depth: null}));

    // Return to Amazon Cognito
    callback(null, event);
};