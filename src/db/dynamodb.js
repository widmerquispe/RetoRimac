// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'eu-west-2' });

// Create the DynamoDB service object
var documentClient = new AWS.DynamoDB.DocumentClient();
const response = require('../common/response');
module.exports = {
	async getPutID(item) {
		var result;
		var params = {
			TableName: process.env.TBL_PERSON,
			Item: {
				...item
			}
		};
		await documentClient.put(params).promise().then(() => {
			result = response(201, {"response":"Persona Creada"});
		}).catch(
			err => result = response(err.statusCode, err)
		);
		return result;
	},

    async listPerson() {
		var result;
		var params = {
			TableName: process.env.TBL_PERSON
		};
		await documentClient.scan(params).promise().then((data) => {
			result = response(201, {"response":data.Items});
		}).catch(
			err => result = response(err.statusCode, err)
		);
		return result;
	}
}