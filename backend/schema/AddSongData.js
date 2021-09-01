const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AddSongDataSchema = new Schema(
    {
        infoType: {type: String},
        song: { type: String},
        artist: { type: String}, 
        producer: String,
        album: String,
        link: String
    }
)

module.exports = mongoose.model("AddSongDataSchema", AddSongDataSchema);

// https://stackoverflow.com/questions/21971666/mongoose-unique-field