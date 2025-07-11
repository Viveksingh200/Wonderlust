const express = require("express");
const router = express.Router();
const wrapAsync = require("../utile/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const Listing = require("../models/listing");

router.route("/")
.get( wrapAsync(listingController.index))
.post( 
    isLoggedIn, 
    upload.single("listing[image]"), 
    validateListing,
    wrapAsync(listingController.createListing));

 
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.patch(
    isLoggedIn, 
    isOwner,
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.deleteListing)
);
 
 //Edit Route
 router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//Search Route
router.get("/", async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

  // Category filter (already working)
  if (category && category !== "all") {
    filter.Category = category;
  }

  // Search filter (title, location, country)
  if (search) {
    const regex = new RegExp(search, "i"); // case-insensitive
    filter.$or = [
      { title: regex },
      { location: regex },
      { country: regex },
    ];
  }
  if (allListings.length === 0) { 
          req.flash("error", "No listings found");
      } 

  const allListings = await Listing.find(filter);
  res.render("listings/index", { allListings, search });
});


 module.exports = router;
 