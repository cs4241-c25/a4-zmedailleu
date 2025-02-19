const express = require('express');
const {ObjectId} = require("mongodb");
const {join} = require("path");
const app = express();
const cors = require('cors');


app.listen(process.env.PORT || 3000);
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zjmedailleu:MonkeyBongos81@cluster0.0hnjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


let collection = null;
let users = null;



app.use(express.static(join(__dirname, 'dist')));


app.use(express.json());
app.use(cors());

async function main() {
    try {
        await client.connect().then(() => console.log("Connected!"));
        const db = await client.db("Games");
        collection = await db.collection("Games");
        users = await db.collection("Users");

    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

// Middleware to check connection to DB
app.use((req, res, next) => {
    if (collection !== null) {
        next();
    } else {
        // Could not connect to the DB. Send an error.
        res.sendStatus(503);
    }
});



app.use('/', (req, res, next) => {
    //console.log("Request URL: " + req.url);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
});

app.get('/getdata', async (req, res) => {
    const currentUser = req.query.user;
    const appdata = await collection.find({user: currentUser}).toArray();
    res.json(appdata);
});

app.get('/getusers', async (req, res) => {

    const appdata = await users.find().toArray();
    res.json(appdata);
});

app.post('/submit', async (req, res) => {
    let data = req.body;

    const newData = await collection.insertOne(data);
    res.json(data);

});

app.post('/delete/:id', (req, res) => {

    const id = req.params.id;
    const newData = collection.deleteOne({_id: new ObjectId(id)});

    res.json(newData);
});

app.put('/modify', async (req, res) => {
    const id = req.body._id;
    const modifiedRow = {name: req.body.name, platform: req.body.platform, startdate: req.body.startdate, completiondate: req.body.completiondate, rating: req.body.rating, user: req.body.user};

    const deleteData = collection.deleteOne({_id: new ObjectId(id)});
    const modifiedData = await collection.insertOne(modifiedRow);

    res.json(modifiedData);
});