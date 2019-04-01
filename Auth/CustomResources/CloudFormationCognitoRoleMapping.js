//const { send, SUCCESS, ERROR } = require('cfn-response');

/* 
exports.handler = (event, context, callback) => {
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
            //send(event, context, SUCCESS, { [attName]: result });
            
            break;
        case 'Delete':
            send(event, context, SUCCESS);
            break;
    }
};
*/

const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        console.log(JSON.stringify(event, null, 2));
        const { RequestType, ResourceProperties: props = { } } = event;
        const { Entries: entries = [ ], AttributeName: attName } = props;
        const result = { };
        switch(event.RequestType) {
            case 'Create':              // On a 'Create' it should fall through to 'Update'

            case 'Update':
                for (let i = 0; i < entries.length; i++) {
                    const { Key, Value } = entries[i]
                    if (Key) {
                        result[Key] = Value
                    }
                }
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