import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger'

dotenv.config();

mongoose.Promise = global.Promise;

const uri = process.env.DB_URI;
const env = "dev"
const connection = mongoose.connect(uri);

export const connect = () => {
	connection
	.then(db => {
		logger.info(
			`Successfully connected to ${uri} MongoDB cluster in ${
			env
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			logger.info('Attempting to re-establish database connection.');
			mongoose.connect(uri);
		} else {
			logger.error('Error while attempting to connect to database:');
			logger.error(err);
		}
	});

}
