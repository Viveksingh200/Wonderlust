const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utile/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { postReview, deleteReview } = require("../controllers/reviews.js");


//reviews
 //Post Route
 router.post("/",isLoggedIn ,validateReview , wrapAsync(postReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;