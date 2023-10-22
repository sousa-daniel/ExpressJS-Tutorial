const express = require('express')
const app = express()
const port = 3000

// Route Parameters

// GET method route

// ../
app.get('/', (req, res) => {
    res.send('Hello! Try to make other requests.')
})

// ../users/{id}
app.get('/users/:userId', (req, res) => {
    res.send("You requested info about user with id " + req.params.userId)
})

// ..users/{user_id}/books/{book_id}
app.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

// Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.

//can be used like so --> ../flights/LUX-USA
app.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})

// or this, which can be used like so --> ../flights/LUX.USA

app.get('/flights/:from.:to', (req, res) => {
    res.send(req.params)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})