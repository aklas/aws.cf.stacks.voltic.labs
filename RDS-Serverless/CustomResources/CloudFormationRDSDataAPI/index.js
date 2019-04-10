const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    
    // var rds = new AWS.RDS();
    var rds = new AWS.RDS({apiVersion: '2014-10-31'});
    // rds.addRoleToDBCluster(params, function (err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else     console.log(data);           // successful response
    // });

    try {
        console.log(event.ResourceProperties.EnableDataAPI);
        console.log(typeof event.ResourceProperties.EnableDataAPI);
        
        switch(event.RequestType) {
            case 'Create':              // On 'Create' it should fall through to 'Update'

            case 'Update':
                await rds.modifyDBCluster({
                    DBClusterIdentifier: event.ResourceProperties.DBClusterIdentifier, 
                    EnableHttpEndpoint:  JSON.parse(event.ResourceProperties.EnableDataAPI)
                }).promise();

                await sendCloudFormationResponse(event, 'SUCCESS');
                break;
            case 'Delete':
                await sendCloudFormationResponse(event, 'SUCCESS');
                break;
            default:
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