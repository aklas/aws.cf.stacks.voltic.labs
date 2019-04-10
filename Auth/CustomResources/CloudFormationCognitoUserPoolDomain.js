const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        
        switch (event.RequestType) {
            case 'Create':
                await cognitoIdentityServiceProvider.createUserPoolDomain({
                    UserPoolId: event.ResourceProperties.UserPoolId,
                    Domain: event.ResourceProperties.Domain
                }).promise();
                break;
                
            case 'Update':
                await deleteUserPoolDomain(cognitoIdentityServiceProvider, event.OldResourceProperties.Domain);
                
                await cognitoIdentityServiceProvider.createUserPoolDomain({
                    UserPoolId: event.ResourceProperties.UserPoolId,
                    Domain: event.ResourceProperties.Domain
                }).promise();
                break;
                
            case 'Delete':
                await deleteUserPoolDomain(cognitoIdentityServiceProvider, event.ResourceProperties.Domain);
                break;
        }
        
        await sendCloudFormationResponse(event, 'SUCCESS');
        console.info(`CognitoUserPoolDomain Success for request type ${event.RequestType}`);
    } catch (error) {
        console.error(`CognitoUserPoolDomain Error for request type ${event.RequestType}:`, error);
        await sendCloudFormationResponse(event, 'FAILED');
    }
}


///////////////////////////////////////////////////////////////////////////////////

const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        const enableDataAPI = event.ResourceProperties.EnableDataAPI
        // event.ResourceProperties.UserPoolId
        console.log(JSON.stringify(event, null, 2));

        switch(event.RequestType) {
            case 'Create':              // On a 'Create' it should fall through to 'Update'

            case 'Update':
                // send(event, context, SUCCESS, { [attName]: result });
                await sendCloudFormationResponse(event, 'SUCCESS', { [attName]: result });
                break;
            case 'Delete':
                // send(event, context, SUCCESS);
                await sendCloudFormationResponse(event, 'SUCCESS');
                break;
            default:
                // send(event, context, SUCCESS);
                await sendCloudFormationResponse(event, 'SUCCESS');
                break;
        }
        console.info(`DynamicMapTransform Success for request type ${event.RequestType}`);
    } catch (error) {
        console.error(`DynamicMapTransform Error for request type ${event.RequestType}:`, error);
        await sendCloudFormationResponse(event, 'FAILED');
    }
}

async function sendCloudFormationResponse(event, responseStatus, responseData) {
    var params = {
        FunctionName: 'CloudFormationSendResponse',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            ResponseURL: event.ResponseURL,
            ResponseStatus: responseStatus,
            ResponseData: responseData
        })
    };
    
    var lambda = new AWS.Lambda();
    var response = await lambda.invoke(params).promise();
    
    if (response.FunctionError) {
        var responseError = JSON.parse(response.Payload);
        throw new Error(responseError.errorMessage);
    }
}