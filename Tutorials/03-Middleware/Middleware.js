const express = require('express')
const app = express()
const port = 3000

// Here we define 2 similar middleware functions that print a log each time a request is made.
const myLogger1 = function (req, res, next) {
    console.log('Logger 1 says: A request has been made.')
    next()
}

const myLogger2 = function (req, res, next) {
    console.log('Logger 2 says: A request has been made.')
    next()
}


// Here we load the middleware (logger 1), which will be executed every time any request is made.
app.use(myLogger1)

// Now, what if we only want a log for certain requests?
// Instead of loading and enabling it globally, we'll select it in our request handler because it can take multiple callback functions.

// A request to this path will therefore use loggers 1 and 2
app.get('/', myLogger2, (req, res) => {
  res.send('Hello World!')
})

// A request to this path will only use logger 1
app.get('/test', (req, res) => {
    res.send('Testing...')
})

// SECOND PART

/**
 * By now you probably understood how and when middleware is executed.
 * 
 * In any case, here is one more example that clearly shows its behaviour:
 * 
 *      Below we create a middleware that gets the time at which a request
 *      was made and sends it back to user as HTML. 
 * 
 */

const requestTime = function (req, res, next) {
    // To log the time it can be done like so
    console.log(`The time was requested and it is ${Date.now()}`)
    console.log('The time was requested and it is ' + Date.now())
    // If you want to use the requested time in other functions or send it to the user, just add it to the request.
    req.requestTime = Date.now()
    next()
}

app.get('/time', requestTime, (req, res) => {
    res.send('You requested the time! It is ' + req.requestTime)  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)  
})