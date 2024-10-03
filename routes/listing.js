const express = require("express");
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const {isloggedIn, isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

router.route("/")
.get(wrapAsync (listingController.index))
.post(isloggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));



//new route
router.get("/new", isloggedIn, listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isloggedIn, isOwner, wrapAsync(listingController.editListing));
    
module.exports = router;


// old code before router.route 

// // index route
// router.get("/", wrapAsync (listingController.index)
//  );
 

//  //show route
//  router.get("/:id", wrapAsync(listingController.showListing));
 

//  //create route
//  router.post("/" ,isloggedIn, validateListing, wrapAsync(listingController.createListing)
//  );
 

  
 
 //update route
//  router.put("/:id",isloggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));
 
//  //delete route
//  router.delete("/:id", isloggedIn, isOwner, wrapAsync(listingController.destroyListing));


 