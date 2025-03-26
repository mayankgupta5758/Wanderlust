const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main().then(() => console.log("Connect Successfully...."))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67b04c7597865500d4bc24a5"}))
    await Listing.insertMany(initData.data);
    console.log("Data was inilisized.......");
}

initDB();