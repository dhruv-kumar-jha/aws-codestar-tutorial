'use strict';

const AWS = require('aws-sdk');
const config = require('../config');
AWS.config.loadFromPath('./config/aws.json');

const SNS = new AWS.SNS();

module.exports = ( req, res ) => {

	const body = req.body;

	if ( ! body.to || ! body.message ) {
		return res.json({
			message: 'error',
			description: 'You must specify the to field (phone number) and the message field.'
		});
	}

	const message = {
		Message: body.message,
		MessageStructure: 'string',
		PhoneNumber: body.to
	}

	const sms = SNS.publish( message, (error, data) => {
		if ( error ) {
			return res.json({
				message: 'failed',
				error: error
			});
		}
		return res.json({
			message: 'success',
			description: 'message successfully sent.'
		});
	});


};
