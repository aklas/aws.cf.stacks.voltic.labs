// For helpful information visit the following websites:
// https://qbox.io/blog/integrating-elasticsearch-into-node-js-application

// Create an Elasticsearch client for your Amazon ES
let esEndpoint = "https://search-test-domain-ghxjxettuqbepzk3whzondh25u.us-east-1.es.amazonaws.com"
let es = require('elasticsearch').Client({
	hosts: [ esEndpoint ],
	connectionClass: require('http-aws-es')
});
// Sample Data
let indexName  = "search_engines";
let typeName   = "opensource";
let docID 	   = 1;
let document   = {
			"Name": "Elasticsearch",
			"ReleaseYear": 2010,
			"Description": "Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases"
		};
// Sample Query
let queryStr   = "RESTful";
let queryField = "Description";

exports.handler = (event, context, callback) => {
	console.log("STARTING");
	// postDocumentToESDomain();
	// simpleSearch();
	// checkESStatus();
	console.log("ENDING");
};

function postDocumentToESDomain(){
	// Visit the following link to learn more about indexing a document
	// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_index
	es.index({
		index: indexName,
		type: typeName,
		id: docID,
		body: document
	}, function(err, resp, status) {
		console.log(JSON.stringify(resp, null, 0));
	});
}

function simpleSearch(){
	es.search({
		index: indexName,
		type: typeName,
		q: queryField + ":" + queryStr
	}).then(function(resp) {
		console.log(JSON.stringify(resp, null, 0));
	}, function(err) {
		console.trace(err.message);
	});
}

function checkESStatus(){
	es.ping({
		requestTimeout: 30000,
	}, function(error) {
		if (error) {
			console.error('Elasticsearch cluster is down!');
			console.error('(Possibly check AWS IAM Role of ES Domain to See if this Lambda has permission)');
		} else {
			console.log('ES Domain is live and lambda function can communicate with it');
		}
	});
}

// NOTES
// Can only have a single type in index for newer ES releases, see: https://www.elastic.co/guide/en/elasticsearch/reference/6.0/breaking-changes-6.0.html
