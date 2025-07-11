const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: {
            values: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"]
            },
    }
});

// listSchema.post("findOneAndDelete", async(listing)=>{
//     if(listing){
//         await Review.deleteMany({_id: {$in: listing.reviews}});
//     }
// });

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;