// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let AWS = require('aws-sdk');
let util = require('util');
let documentClient = new AWS.DynamoDB.DocumentClient();

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
    // console.log("BEFORE(PostConfirmation): " + util.inspect(event, {depth: null}));
    console.log("BEFORE(PostConfirmation): ");
    console.log(JSON.stringify(event, null, 0));

	// const userAttributes = event.request.userAttributes;
	// // var userName = "5706a774-f27a-4812-9924-48c75249c69d";
	// // var firstName = "Aklas";
	// // var lastName = "Cheema";
	// // var email = "cheemaab@ucalgary.ca";
	// var userName = userAttributes.sub;
	// var firstName = userAttributes.given_name;
	// var lastName = userAttributes.family_name;
	// var email = userAttributes.email;
    // var about = " ";
    // var signuptime = (new Date).getTime();
    // var rating = 0;
    // var profilePic = "NIL";
    // var account_id = "NIL";
    // var coustmer_id = "NIL";
    
    // var streams = [];
    // var postedDiscoveries = [];
    // var favouriteDiscoveries = [];
    // var reviewsLeft = [];
    
    
	// console.log("userName: " + userName);
	// console.log("firstName: " + firstName);
	// console.log("lastName: " + lastName);
	// console.log("email: " + email);
/*
	//////////////////////////////////////////
	var streams = [""];
	// Insertion into the database
	var params = {
		TableName : "ServinUsers",
		Key: {
		    "userId": userName
		},
		//UpdateExpression: "set tags= :arrp",
		// UpdateExpression: "ADD tags = list_append(tags, :arrp)",
		UpdateExpression: 
		"SET given_name = :first_name, family_name = :last_name, signUpDate = :signuptime, about = :about, rating = :rating," + 
		"profilePic = :profilePic, account_id = :account_id, coustmer_id = :coustmer_id, streams = :streams, " +
		"postedDiscoveries = :postedDiscoveries, favouriteDiscoveries = :favouriteDiscoveries, reviewsLeft = :reviewsLeft",
// 		"SET streams = :streams",
		ExpressionAttributeValues: {
	    	":first_name": firstName,
	    	":last_name": lastName,
	    	":signuptime": signuptime,
	    	":about": about,
	    	":rating": rating,
	    	":profilePic": profilePic,
	    	":account_id": account_id,
	    	":coustmer_id": coustmer_id,
	    	":streams": {},//documentClient.c.createSet(Array.from(new Set(streams)))
	    	":postedDiscoveries": {},
	    	":favouriteDiscoveries": {},
	    	":reviewsLeft": {}
		}
	};
	documentClient.update(params, function(err, data) {
		if (err) {
		    console.log(err);
		    callback(err, null);
		}else{
		    console.log(data);
		    callback(null, data);
		}
    });
    */
	/////////////////////////////////////////
	//event.response = { autoConfirmUser: true }
    //return event

    // console.log("AFTER(PostConfirmation: " + util.inspect(event, {depth: null}));
	callback(null, event);
};
