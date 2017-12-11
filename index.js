import restify from 'restify';
import mongoose from 'mongoose';

/**
 * Creating server
 * @type {*|Server}
 */
const server = restify.createServer({
    name: 'nodejs-async-await-example'
});

/**
 * Configure parser
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/**
 * Call .env
 */
require('dotenv').config();

/**
 * Set mongoose promise
 */
mongoose.Promise = global.Promise;

/**
 * Connect to DB
 * @type {MongooseThenable}
 */
mongoose.connect(process.env.DB_HOST, {
    useMongoClient: true
}).then(() => {
    console.log('Connected to DB!');
}, (err) => {
    console.log(err);
    throw new Error('An error occurred while connecting to DB!')
});

/**
 * Registering routes
 */
require('./src/Routes/User')(server);

/**
 * Starting server
 */
server.listen(3000, () => {
    console.log('%s listening at %s', server.name, server.url);
});