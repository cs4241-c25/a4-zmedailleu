const express = require('express');
const {ObjectId} = require("mongodb");
const {join} = require("path");
const app = express();
const cors = require('cors');

const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

app.listen(process.env.PORT || 3000);
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zjmedailleu:MonkeyBongos81@cluster0.0hnjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


let collection = null;
let users = null;

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_HOST,
    MONGO_DBNAME,
    MONGO_DBCOLLECTION,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    EXPRESS_SESSION_SECRET
} = process.env;


app.use(express.static(join(__dirname, 'dist')));

app.use(session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
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

/**
 * Serialize the user.
 * Every time the user logs in, it stores the data in `done`'s `id` parameter (the one after null) in `req.user`.
 */
passport.serializeUser(function (user, done) {
    done(null, { username: user.username, id: user._id || user.id });
});


/**
 * Deserialize the user.
 * Every time the user's session is ended, it removes `obj` from the user's req.
 */
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

/**
 * Create the GitHub Strategy.
 *
 * Note that the callback URL is OPTIONAL. If it is not provided, it will default to the one configured
 * in GitHub. See the README for information on how to set that up.
 *
 * If you do decide to include the callbackURL, it must be EXACT. Any missmatch from the GitHub one and it will
 * fail.
 */
passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, done) {
        // This code will run when the user is successfully logged in with GitHub.
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

// This is the callback to put in GitHub. If the authentication fails, it will redirect them to '/login'.
app.get('/auth/github/callback',
    passport.authenticate('github', { session: true, failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// The route to redirect the user to when you want to actually have them log in with GitHub.
// It is what happens when you click on the "Log in with GitHub" button.
// Note that the scope is 'user:email'. You can read more about possible scopes here:
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
// You should not need anything other than the 'user:email' if just authenticating with GitHub.
// <a href="/auth/github">Login with GitHub</a>
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.use('/', (req, res, next) => {
    console.log("Request URL: " + req.url);
    next();
});

app.get("/", ensureAuth, (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
});

app.get("/login", (req, res) => {
    // User is logged in
    if (req.user) {
        res.redirect("/");
    } else {
        // User is not logged in
        res.sendFile(__dirname + "login.html");
    }
});

app.get("/logout", (req, res) => {
    req.logout(() => { });
    res.redirect('/');
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

app.put('/modify/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    await collection.updateOne({ _id: id}, {$set: data});
    res.json(data);
});