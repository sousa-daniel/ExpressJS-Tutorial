## RESTful API with Node.js

This is a project I had to do as part of Web Dev class.

The solution.js is my personal solution for the project. Additionally, an official solution is also included.

The description below has the project requirements given at the time.

The necessary toydatabase.js is also included.

---

## Description

You must create a JSON-based RESTful API server that handles a database of random users.
To help you focus on the API design, you are given a JSON-based in-memory toy database (toydatabase.js) that has all the functionality needed to complete this assignment.
Usage example:


const ToyDatabase = require('./toydatabase');
const db = new ToyDatabase();

Your server must be written with Express and must implement the following specifications:

1. A GET request to the /users endpoint should return a 200 (OK) HTTP status code and a JSON string representing the list of all users in the database.
2. A GET request to a non-existent endpoint should return a 404 (Not Found) HTTP status code and an associated error message.
3. A POST request to the /users endpoint with any valid payload should return a 201 (Created) HTTP status code and a JSON string with the user data just created.
4. A POST request to the /users endpoint with an empty payload should return a 422 (Unprocessable Entity) HTTP status code and an associated error message.
5. A GET request to the /users/:uid endpoint should return a 200 (OK) HTTP status code and a JSON string representing the user data.
6. A GET request to the /users/:uid endpoint with a non-existent uid should return a 404 (Not Found) HTTP status code and an associated error message.
7. A PUT request to the /users/:uid endpoint with any valid payload should return a 201 (Created) HTTP status code and a JSON string representing the user data just created.
8. A DELETE request to the /users/:uid endpoint should return a 204 (No Content) HTTP status code and a message confirming the operation.
9. Any subsequent DELETE requests to the /users/:uid endpoint should return a 404 (Not found) HTTP status code and an associated error message.

Notes:

In the last five specifications, the :uid param in all /users/:uid endpoints can be any integer (ideally > 1).
You can return error messages as HTML, plain text, or as a JSON string. What matters in this assignment is that your API server returns the expected error code.
