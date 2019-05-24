// Import necessary libraries
import * as express from "express";
import shortenURL from "../services/shortenURL";

// Use the express router function to create a new route
const ROUTER = express.Router();

ROUTER.post('/', async (req, res, next) => {
  try{
    if(process.argv[2] === 'inMemory'){
      res.status(200).json(shortenURL.StoreURLInMemory(req.headers.host, req.body.url));
    }
    else{
      res.status(200).json(await shortenURL.StoreURLInDB(req.headers.host, req.body.url));
    }
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})

// Export router as the default object
export default ROUTER;