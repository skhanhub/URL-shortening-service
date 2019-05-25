// File containing the root route
import * as express from "express";
import * as path from "path";
import shortenURL from "../services/shortenURL";
// Use the express router function to create a new route
const ROUTER = express.Router();


/*
  GET route for fetching the index.html home page
  This route does not take any arguments
  It returns the index.html page
*/
ROUTER.get('/', async (req, res, next) => {
  try{
    res.status(200).sendFile(path.join(__dirname, '../../client/build'));
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})
/*
  GET route for fetching the original URL
  This route takes the urlKey as a parameter
  It redirect the requester to the original URL and no URL found then it sends a 404
*/
ROUTER.get('/:url', async (req, res, next) => {
  try{
    let result;
    if(process.argv[2] === 'inMemory'){
      result = shortenURL.LoadURLFromMemory(req.params.url);
    }
    else{
      result = await shortenURL.LoadURLFromDB(req.params.url);
    }

    if(result.status === 0){
      res.status(404).send(result.message);
    }
    else{
      res.status(302).redirect(result.url);
    }
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})

// Export router as the default object
export default ROUTER;
