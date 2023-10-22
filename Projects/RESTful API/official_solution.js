const express = require('express');
const app = express();

// All payloads will arrive in JSON format.
app.use(express.json());

// Generate some random data.
const ToyDatabase = require('./toydatabase');
const db = new ToyDatabase(10);

// Some endpoints require user IDs as integers,
// so let's create a middleware for that.
const checkId = (req, res, next) => {
    if (req.params && req.params.uid)
        req.params.uid = parseInt(req.params.uid);

    next();
}

// Some endpoints require a valid payload,
// so let's create a middleware for that.
const checkPayload = (req, res, next) => {
    if (!Object.keys(req.body).length)
        res.status(422).send('No data sent').end();
    else next();
}

// List ALL users in DB.
app.get('/users', (req, res) => {
    res.json(db.records);
});

// Add a new user to DB.
app.post('/users', checkPayload, (req, res) => {
    let entry = db.insert(req.body);
    res.status(201).json(entry);
});

// Read existing user.
app.get('/users/:uid', checkId, (req, res) => {
    let user = db.findById(req.params.uid);
    if (!user) return res.status(404).send('No user found');

    res.json(user);
});

// Update existing user, or create new.
app.put('/users/:uid', checkId, checkPayload, (req, res) => {
    let exists = db.findById(req.params.uid);
    let user = db.updateById(req.params.uid, req.body, !exists);

    res.status(201).json(user);
});

// Delete existing user.
app.delete('/users/:uid', checkId, (req, res) => {
    let status = db.deleteById(req.params.uid);
    if (!status) return res.status(404).send('User not found');

    // Note that the CA asks for a confirmation message,
    // but it's not compatible with the 204 status code (no content)
    // so we won't see any response message in this case.
    res.status(204).send('User deleted');
});


// Finally run app on given port.
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
