const AWS = require('aws-sdk');
const S3  = new AWS.S3();

exports.handler = async (event) => {
    console.log("Running RDS Initializers");
    console.log(JSON.stringify(event, null, 2));

    // var rds = new AWS.RDS({apiVersion: '2014-10-31'});
    //  Read S3 file
    console.log("STARTING");
    
    //  S3 Info needed
    //  - Bucket Name
    //  - Key
    var bucketName = "aws-sam-stacks";
    var key        = "DBInfo/Schema_Script.sql";
    var S3result = await S3.getObject({
        Bucket: bucketName,
        Key: key
    }).promise();
    const sqlStatements = S3result.Body.toString('ascii');
    console.log(sqlStatements);

    //  RDS Info needed
    //  - AWS Secret Store Arn
    //  - DB Cluster Arn
    await RDS.executeSql({
        awsSecretStoreArn: 'arn:aws:secretsmanager:us-east-1:XXXXXXXXX:secret:test/data-api/mysql-JchWT1',
        dbClusterOrInstanceArn: 'arn:aws:rds:us-east-1:XXXXXXXXXXX:cluster:test-data-api',
        sqlStatements: sqlStatements,
        // database: 'test_data_api'
    }).promise();

    console.log("DONE");
    // try {
    //     console.log(event.ResourceProperties.EnableDataAPI);
    //     console.log(typeof event.ResourceProperties.EnableDataAPI);


    //     switch(event.RequestType) {
    //         case 'Create':              // On 'Create' it should fall through to 'Update'

    //         case 'Update':
    //             // await rds.modifyDBCluster({
    //             //     DBClusterIdentifier: event.ResourceProperties.DBClusterIdentifier, 
    //             //     EnableHttpEndpoint:  JSON.parse(event.ResourceProperties.EnableDataAPI)
    //             // }).promise();

    //             // var bucketName = "aws-sam-stacks";
    //             // var key        = "DBInfo/Schema_Script.sql";
    //             // var something = await S3.getObject({
    //             //     Bucket: bucketName,
    //             //     Key: key
    //             // }).promise();

    //             await sendCloudFormationResponse(event, 'SUCCESS');
    //             break;
    //         case 'Delete':
    //             await sendCloudFormationResponse(event, 'SUCCESS');
    //             break;
    //         default:
    //             await sendCloudFormationResponse(event, 'SUCCESS');
    //             break;
    //     }
    //     console.info(`DynamicMapTransform Success for request type ${event.RequestType}`);
    // } catch (error) {
    //     console.error(`DynamicMapTransform Error for request type ${event.RequestType}:`, error);
    //     await sendCloudFormationResponse(event, 'FAILED');
    // }
}

// async function sendCloudFormationResponse(event, responseStatus, responseData) {
//     var params = {
//         FunctionName: 'CloudFormationSendResponse',
//         InvocationType: 'RequestResponse',
//         Payload: JSON.stringify({
//             StackId: event.StackId,
//             RequestId: event.RequestId,
//             LogicalResourceId: event.LogicalResourceId,
//             ResponseURL: event.ResponseURL,
//             ResponseStatus: responseStatus,
//             ResponseData: responseData
//         })
//     };
    
//     var lambda = new AWS.Lambda();
//     var response = await lambda.invoke(params).promise();
    
//     if (response.FunctionError) {
//         var responseError = JSON.parse(response.Payload);
//         throw new Error(responseError.errorMessage);
//     }
// }
