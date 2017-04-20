'use strict';

const app = require('./app');
const config = require('./config');

app.set('port', config.PORT );

// start the server
app.listen(
	app.get('port'),
	() => {
		const port = app.get('port');
		console.log('AWS CodeStar running at http://127.0.0.1:' + port );
	}
);

