const AWS = require('aws-sdk');
const S3  = new AWS.S3();
const RDS = new AWS.RDSDataService();

exports.handler = async (event) => {
    console.log("Running RDS Initializers");
    console.log(JSON.stringify(event, null, 2));
    console.log(JSON.stringify(context, null, 2));
    // var bucketName = "aws-sam-stacks";
    // var key        = "DBInfo/Schema_Script.sql";
    // var S3result = await S3.getObject({
    //     Bucket: bucketName,
    //     Key: key
    // }).promise();
    // const sqlStatements = S3result.Body.toString('ascii');
    // console.log(sqlStatements);

    //  RDS Info needed
    //  - AWS Secret Store Arn
    //  - DB Cluster Arn
    // var result = await RDS.executeSql({
    //     awsSecretStoreArn: 'arn:aws:secretsmanager:us-east-1:884685334400:secret:RDSSecret-nd7qoB',               //  ARN of Secret that stores DB username and password
    //     dbClusterOrInstanceArn: 'arn:aws:rds:us-east-1:884685334400:cluster:dbclusteridentifier',                 //  ARN of Aurora Serverless Cluster
    //     sqlStatements: sqlStatements
    //     // database: 'test_data_api'
    // }).promise();
    
    // console.log(JSON.stringify(result, null, 2));

    try {
        console.log("AKLS");
        switch(event.RequestType) {
            case 'Create':              // On 'Create' it should fall through to 'Update'

            case 'Update':
                //  Read S3 for DB SQL Script
                var S3result = await S3.getObject({
                    Bucket: event.ResourceProperties.Bucket,
                    Key: event.ResourceProperties.Key
                }).promise();

                //  Execute SQL Script
                await RDS.executeSql({
                    awsSecretStoreArn: event.ResourceProperties.SecretId,                        //  ARN of Secret that stores DB username and password
                    dbClusterOrInstanceArn: event.ResourceProperties.RDSArn,                     //  ARN of Aurora Serverless Cluster
                    sqlStatements: S3result.Body.toString('ascii')
                    // database: 'test_data_api'
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
        console.error("ERROR");
        console.error(`DynamicMapTransform Error for request type ${event.RequestType}:`, error);
        await sendCloudFormationResponse(event, 'SUCCESS');
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