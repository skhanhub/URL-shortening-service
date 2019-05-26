import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as createError from 'http-errors';
import configs from "../config";
import home from "./routes";
import newURL from "./routes/newURL";
import shortenURL from "./services/shortenURL";
// Port on which incoming requests will arrive
const PORT = process.env.PORT || 5000
// Create the application
const APP = express();
// Load the configs
const CONFIG = configs['production'];
// Set sitename
APP.locals.title = CONFIG.sitename;

APP.use(logger('dev'));
// support json encoded bodies
APP.use(express.json());
// support urlencode
APP.use(express.urlencoded({ extended: false }));
APP.use(cookieParser());
// Set the public static folder containing the front end template and logic
APP.use(express.static(path.join(__dirname, '../public')));

if(process.argv[2] !== 'inMemory'){
  shortenURL.InitializeDB();
}


// If dev env then set pretty to true
if (APP.get('env') === 'development') {
  APP.locals.pretty = true;
}


// Add the title to the response
APP.use(async (req, res, next) => {
  res.locals.status = APP.locals.title;
  // Call the next function
  return next();
});


APP.use('/', home); // Connect the base route to the route handling function stored inside /routes/index
APP.use('/api/shortenurl', newURL); // Connect the /api/currencies route to the route handling function stored /routes/currencies

// Middleware for handleing error
APP.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});
// Middleware for handleing error
APP.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.APP.get('env') === 'development' ? err : {};
  res.status(status);

  // respond with html page
  if (req.accepts('html')) {
    // return res.status(404).redirect('back');
    return res.status(404);
  }

  // respond with json
  if (req.accepts('json')) {
    return res.send({ error: 'Not found' });
  }

  // default to plain-text. send()
  return res.type('txt').send('Not found');
});

// Run the web APP and store the returned variable for later export
let server = APP.listen(PORT, () => console.log(`Listening on ${PORT}`));
// Export the server for unit testing
export default server;
