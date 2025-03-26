const mongoose = require("mongoose");
const { ref } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://a0.muscache.com/im/pictures/miso/Hosting-1256296320063412023/original/025b9891-bd2a-4d7a-8071-93e90a198862.jpeg?im_w=1200&im_format=avif",
        set: (v) => {
            return v === ""
                ? "https://a0.muscache.com/im/pictures/miso/Hosting-1256296320063412023/original/025b9891-bd2a-4d7a-8071-93e90a198862.jpeg?im_w=1200&im_format=avif"
                : v;
        },
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
