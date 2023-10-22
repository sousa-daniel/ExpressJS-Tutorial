const express = require('express')
const app = express()
// Parses received requests to Json
app.use(express.json());
const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Server listening`)
})

// CREATE DATABASE

const ToyDatabase = require('./toydatabase');
const { json } = require('express');
const db = new ToyDatabase();

  // HTTP REQUEST METHODS HANDLERS

// 1. A GET request to the /users endpoint should return a 200 (OK) HTTP status code and a JSON string representing the list of all users in the database.

app.get('/users', (req,res) => {
  res.status(200)
  // Convert all records to a string and send it as response
  res.send(JSON.stringify(db.records))
  console.log('Sent all ' + db.records.length + ' database user info')
})

// 2. (At the bottom)

// 3. A POST request to the /users endpoint with any valid payload should return a 201 (Created) HTTP status code and a JSON string with the user data just created.
// 4. A POST request to the /users endpoint with an empty payload should return a 422 (Unprocessable Entity) HTTP status code and an associated error message.


app.post('/users', (req,res) => {
  const data = req.body
  const num = Number(data.id)
  // If object has no properties
  if(Object.keys(data).length === 0) {
    console.log('Object missing');
    res.status(422).send("Body missing.\n")
  } else {
    res.status(201).json(db.updateById(num, data, true))
  }

})

// 5. A GET request to the /users/:uid endpoint should return a 200 (OK) HTTP status code and a JSON string representing the user data.
// 6. A GET request to the /users/:uid endpoint with a non-existent uid should return a 404 (Not Found) HTTP status code and an associated error message.

app.get('/users/:uid', (req,res) => {
  // Retrieves 'uid' from url, converts to number and uses it as input to determine whether an entry with this id exists
  const num = Number(req.params.uid)
  const u = db.findById(num)
  if (u == false) {
    res.status(404).send("The user you are looking for doesn't exist.\n")
  } else {
    res.status(200).send(u)
  }
  
})

// 7. A PUT request to the /users/:uid endpoint with any valid payload should return a 201 (Created) HTTP status code and a JSON string representing the user data just created.

app.put('/users/:uid', (req,res) => {
  // Retrieves 'uid' from url, converts to number and uses it as input to find data to be updated
  const num = Number(req.params.uid)
  res.status(201)
  // If user is not already existent then a new entry is created, otherwise it is updated
  if (db.findById(num) == false) {
    res.send(db.updateById(num, req.body, createNew=true))
  } else {
    res.send(db.updateById(num, req.body))
  }

})

// 8. A DELETE request to the /users/:uid endpoint should return a 204 (No Content) HTTP status code and a message confirming the operation.
// 9. Any subsequent DELETE requests to the /users/:uid endpoint should return a 404 (Not found) HTTP status code and an associated error message.

app.delete('/users/:uid', (req,res) => {
  // Retrieves 'uid' from url, converts to number and uses it as input to find data to be deleted
  const num = Number(req.params.uid)
  const u = db.deleteById(num)
  if (u) {
    // Status 204 doesnt support body, therefore I passed a message as a custom header
    res.header('Message', 'User deleted successfully.')
    res.sendStatus(204)
  } else {
    res.status(404).send("User not found.")
  }
})

// 2. A GET request to a non-existent endpoint should return a 404 (Not Found) HTTP status code and an associated error message.

// Has to be at the end after all other request handlers otherwise those below are ignored
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!\n")
})

