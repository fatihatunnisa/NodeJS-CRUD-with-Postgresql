const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { pool } = require("./connection");
const db = require('./queries');

app.listen(3000, function () {
  console.log('listening on 3000')
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/", (request, response) => {
  response.json({
      info: 'Hello world!'
  });
})
app.get("/students", db.getStudents);
app.get("/students/:id", db.getStudentById);
app.put("/students/:id", db.updateStudent);
app.post("/students", db.createStudent);
app.delete("/students/:id", db.deleteStudent);