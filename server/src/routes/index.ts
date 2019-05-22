// Import necessary libraries
import * as express from "express";
import urlMap from "../data/inMemory";
// Use the express router function to create a new route
const router = express.Router();


router.get('/:url', async (req, res, next) => {
  try{
    console.log(req.params.url);
    res.status(302).redirect(urlMap[req.params.url]);
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})



// Export router as the default object
export default router;