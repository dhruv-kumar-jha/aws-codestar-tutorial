const express = require('express');
const body_parser = require('body-parser');

const SendEmail = require('./endpoints/email');
const SendSMS = require('./endpoints/sms');

const app = express();

app.use( body_parser.json({ limit: '50mb' }) );
app.use( body_parser.urlencoded({ limit: '50mb', extended: true }) );


// Our middleware, This will check if code is provided or not, And if its correct.
// app.use( ( req, res, next ) => {

// 	if ( req.method === 'POST' ) {
// 		if ( req.body.code && req.body.code == 'SUPERSECRETCODE' ) {
// 			next();
// 		} else {
// 			return res.json({
// 				message: 'Invalid Code',
// 				description: 'Please enter a valid code.'
// 			});
// 		}
// 	}
// 	next();

// });

app.post('/email', SendEmail );
app.post('/sms', SendSMS );

app.get('/', function(req, res) {
	res.json({
		code: 200,
		active: true,
		description: 'Notification Service.'
	});
});

app.post('/', function(req, res) {
	res.send({
		"Output": "Hello World!"
	});
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
