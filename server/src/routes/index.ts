// Import necessary libraries
import * as express from "express";
import shortenURL from "../services/shortenURL";
// Use the express router function to create a new route
const ROUTER = express.Router();

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
