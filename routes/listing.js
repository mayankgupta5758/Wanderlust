const express = require("express")
const route = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listing.js");


// All Listings
route.get("/", wrapAsync(listingController.index));

// new route
route.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Listing
route.get("/:id", wrapAsync(listingController.renderAllListing));

// create route...
// wrapAsync se req humer err handling middleware pe jayagi...
route.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createNewListing));

// edit route
route.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

// update Route
route.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// delete Route
route.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


module.exports = route;