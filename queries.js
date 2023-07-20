const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  database: "dbnisa",
  password: "Pass987!",
  port: 5432,
  host: "postgres",
});

const ResponseClass = require("./model/response")

const getStudents = (request, response) => {
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;

        response.status(200).json(responseReturn);
    })
}

const getStudentById = (request, response) => {
    var responseReturn = new ResponseClass();
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0) {
            responseReturn.status = true;
            responseReturn.code = 404;
            responseReturn.message = "User not found";
            responseReturn.data = null;
        } else {
            responseReturn.status = true;
            responseReturn.code = 200;
            responseReturn.message = "Success";
            responseReturn.data = results.rows[0];
        }
        response.status(200).json(responseReturn);
    })
}

const createStudent = (request, response) => {
    const { id, nickname, address } = request.body;
    pool.query('INSERT INTO students (id, nickname, address) VALUES ($1, $2, $3)', [id, nickname, address], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send("Student added");
    })
}

const updateStudent = (request, response) => {
    const id = parseInt(request.params.id);
    // var responseReturn = ResponseClass();
    try {
        const { nickname, address } = request.body;
        pool.query('UPDATE students SET nickname = $1, address = $2 WHERE id = $3', [nickname, address, id], (error, results) => {
            if (error) {
                throw error
            }
            // responseReturn.status = true;
            // responseReturn.code = 200;
            // responseReturn.message = "User modification successed";
            // responseReturn.data = null;
            // response.status(200).send(responseReturn);
            response.status(200).send('user modified');
        })
    } catch (error) {
        // responseReturn.status = false;
        // responseReturn.code = 500;
        // responseReturn.message = error.message;
        // responseReturn.data = null
        // response.status(500).json(responseReturn);
        response.status(500).send('failed');
    }
}

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("Student deleted");
    })
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}