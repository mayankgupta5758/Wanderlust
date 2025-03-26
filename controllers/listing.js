const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.renderAllListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createNewListing = async (req, res, next) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(404, "Send valid data for listing!!!")
    // }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    // if (!newListing.description) {
    //     throw new ExpressError(404, "Description is Missing!!!")
    // }
    // if (!newListing.price) {
    //     throw new ExpressError(404, "Price is Missing!!!")
    // }
    // ya to hum ye kar sejta haihar ek feild ke liya ya fir hum joy npm pakage ko use kar sekta hai humera scmeka ko validate kerna ke kaam ata hai.
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Not Exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing })
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};