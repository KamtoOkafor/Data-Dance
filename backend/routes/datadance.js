var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SongData = require('../schema/SongData');
const AddSongDataSchema = require('../schema/AddSongData');

const dbRoute = 
    'mongodb+srv://dbUser:dbUserPassword@cluster0.tptyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbRoute, { useUnifiedTopology: true ,  useNewUrlParser: true});

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.delete("/postinfo/deleteFromlib/", async function(req, res) {
    console.log(req.body)
    AddSongDataSchema.findOneAndRemove({ song:req.body.song, artist:req.body.artist}, (err) => {

        if(err) {
            res.status(500).json({status: "Failure to delete data on database", error: err})
            return res.end();
        } else {
            res.status(200).json({status: " Deleted Success!"})
            return res.end();
        }
    })
   
})

router.put("/postinfo/updatelib/", async function(req, res) {
    console.log(req.body)
    AddSongDataSchema.
        findOneAndUpdate(
            {song: req.body.songToChange}, 
            {$set:{
                song:req.body.song,
                producer:req.body.producer,
                artist:req.body.artist,
                album:req.body.album,
                link:req.body.link
            }},
            {new: true},
            (err, doc) => {
                if (err) {
                    res.status(500).json({status: "Failure to update data on database", error: err})
                    return res.end();
                }
                res.status(200).json({status: "Success!", data: doc})
                return res.end();
                console.log(doc);
            })
  
}) 


router.get("/postinfo/getfromlib/", async function(req, res) {
    AddSongDataSchema.find({'infoType': "addedByUser"},function(err, data) {
        if (err) {
            res.status(500).json({status: "Failure to get data from database", error: err})
            return res.end();
        } else {
            res.status(200).json({status: "Success!", data: data})
            console.log({status: "Success!", data: data})
            return res.end();
        }
    })
}) 


router.post("/postinfo/addtolib/", async function(req, res) {
    if (!req.body || !Array.isArray(req.body)) {
        res.status(500).json({ error: "Request body could not be parsed."})
        return res.end();
    }

    // console.log(req.body)
    const result = await Promise.all(req.body.map((data) => tryWriteAddSong(data))); // {...data} => { song: song, artist: artist, etc. }
    // console.log(result)


    if (result.some((e) => !e)) {
        res.status(500).json({ error: "Some saving functions failed!"})
        return res.end();
    } else {
        res.status(200).json({ data: "Success!"})
        return res.end();
    }

})

router.get("/getinfo/", async function(req, res, ) {
    SongData.find({}, function(err, data) {
        if (err) {
            res.status(500).json({status: "Failure to get data from database", error: err})
            return res.end();
        } else {
            res.status(200).json({status: "Success!", data: data})
            return res.end();
        }
    })
});

router.post('/postinfo/', async function(req, res) {
    if (!req.body || !Array.isArray(req.body)) {
        res.status(500).json({ error: "Request body could not be parsed."})
        return res.end();
    }
    const result = await Promise.all(req.body.map((data) => tryWriteSong(data))); // {...data} => { song: song, artist: artist, etc. }
   
    if (result.some((e) => !e)) {
        res.status(500).json({ error: "Some saving functions failed!"})
        return res.end();
    } else {
        res.status(200).json({ data: "Success!"})
        return res.end();
    }
    // const result = await Promise.all(req.body.map((data) => SongData.create({...data}))); // {...data} => { song: song, artist: artist, etc. }
})


function tryWriteAddSong(data) {
    return new Promise(async (resolve, reject) => {
        const songExists = await AddSongDataSchema.exists({song: data.song})
        if (!songExists) {
            AddSongDataSchema.create({...data}).then(data => {
                if (data) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        }
    })
}


function tryWriteSong(data) {
    return new Promise(async (resolve, reject) => {
        const songExists = await SongData.exists({ song: data.song})
        if (!songExists) {
            SongData.create({...data}).then((err, _) => {
                if (err) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        }
    })
}

module.exports = router;



/* 

async function doStuff() {
    const res = await doAsync();
    /// doSyncSlow();
    doSyncFast();
}

function doSyncFast() {
    return 1;
}
function doSyncSlow() {
    /// heavy computation here
}

async function doAsync() {
    /// this takes a long time
    /// to compute
}
 */



// Promise.all([ ... ]) 
// Promise.all([tryWriteSong(), tryWriteSong(), tryWriteSong(), tryWriteSong(), ... ]) 
// Promise.all([true, true, false, ... ]) 

// new Promise((resolve, reject) => {
    // setTimeOut(() => { 
        // resolve(true)
    // }, 2000)
        // resolve() -> return value
        // reject() -> throw new Error
// })
