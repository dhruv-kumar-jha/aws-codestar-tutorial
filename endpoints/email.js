'use strict';

const AWS = require('aws-sdk');
const config = require('../config');
AWS.config.loadFromPath('./config/aws.json');

const SES = new AWS.SES();

module.exports = ( req, res ) => {

	const body = req.body;

	if ( ! body.to || ! body.text || ! body.subject ) {
		return res.json({
			message: 'error',
			description: 'You must specify to, subject and text fields.'
		});
	}


	const email_options = {
		Source: config.email.from, // the email address we verified earlier
		Destination: {
			ToAddresses: Array.isArray(body.to) ? body.to : [ body.to ] // these addresses must be verfied as well otherwise the emails wont be sent.
		},
		Message: {
			Body: {
				Text: {
					Data: body.text
				},
				Html: {
					Data: body.html
				}
			},
			Subject: {
				Data: body.subject
			}
		},
	};


	const email = SES.sendEmail( email_options, (error, data) => {
		if ( error ) {
			return res.json({
				message: 'failed',
				error: error
			});
		}
		return res.json({
			message: 'success',
			description: 'email successfully sent.'
		});
	});


};
