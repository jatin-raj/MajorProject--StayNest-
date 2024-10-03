const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../model/reviews.js");
const Listing = require("../model/listing.js");
const {validateReview, isloggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");



//Reviews
//Post Route
router.post("/", isloggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete(
    "/:reviewId",isloggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview)
);

module.exports = router;