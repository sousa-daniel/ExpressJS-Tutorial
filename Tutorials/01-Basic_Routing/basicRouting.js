const express = require('express')
const app = express()
const port = 3000


// GET method route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// POST method route
app.post('/', (req, res) => {
    res.send('Got a POST request')
})

// PUT method route
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

// DELETE method route
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
