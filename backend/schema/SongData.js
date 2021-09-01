const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SongDataSchema = new Schema(
    {
        song: { type: String, unique: true , dropDups: true},
        artist: { type: String, unique: true , dropDups: true}, 
        producer: String,
        album: String,
        link: String
    }
)

module.exports = mongoose.model("SongData", SongDataSchema);

// https://stackoverflow.com/questions/21971666/mongoose-unique-field