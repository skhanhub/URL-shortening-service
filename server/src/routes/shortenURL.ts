// Import necessary libraries
import * as express from "express";
import * as shortid from "shortid";
import urlMap from "../data/inMemory";
// Use the express router function to create a new route
const router = express.Router();


router.post('/', async (req, res, next) => {
  try{
    const SHORT_URL = shortid.generate();
    urlMap[SHORT_URL] = req.body.url;
    res.status(200).json(SHORT_URL);
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})



// Export router as the default object
export default router;