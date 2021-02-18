import dotenv from 'dotenv';
import express from 'express';
import loggermorgan from 'morgan';
import bodyParser from 'body-parser';
import { connect } from '../src/utils/db';
import logger from './utils/logger';
import { messages } from '../src/utils/message';
import {
    authRouter, contactRouter
  } from '../src/resources';


 

dotenv.config();

const app = express();
connect();

app.use(loggermorgan('dev'));






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;



app.use(authRouter);
app.use(contactRouter);
// app.use('/', defaultRouter);




app.listen(port, () => {
   logger.info(`Server is running on PORT ${port}`);
});
export default app;











// /*
// START HERE
// NOTE:
// Don't forget to implement user authentication for the
// contact resource
// */
// require('dotenv').config()

// import fs from 'fs';
// import path from 'path';
// import express from 'express';
// import expressWinston from 'express-winston';
// import bodyParser from 'body-parser';
// import winston from 'winston';
// import logger from './utils/logger';

// const app = express();

// const port = 3001
// const env = "dev"

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(expressWinston.logger({
// 	transports: [
// 		new winston.transports.Console({
// 			json: true,
// 			colorize: true
// 		})
// 	],
// 	meta: true, // optional: control whether you want to log the meta data about the request (default to true)
// 	msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
// 	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
// 	colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
// 	ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
// }));

// app.listen(port, err => {
// 	if (err) {
// 		logger.error(err);
// 		process.exit(1);
// 	}
// 	require('./utils/db');

// 	require("../src/resources/auth")(app);
//     //require("../src/resources/contact")(app);

// 	// fs.readdirSync(path.join(__dirname, 'resources')).map(file => {
// 	// 	require('./resources/' + file)(app);
// 	// });

// 	logger.info(
// 		`app is now running on port ${port} in ${env} mode`
// 	);
// });

// module.exports = app;
