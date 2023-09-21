const pool = require("../db");

// get all todos
const getTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
}

// get one todo
const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
}

  // update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            description, owner, priority, day, morning, afternoon, evening, duration, completed
        } = req.body;
        if (description) {
            const editTodo = await pool.query("UPDATE todo SET description=$1, owner=$2, priority=$3, day=$4, morning=$5, afternoon=$6, evening=$7, duration=$8, completed=$9 WHERE todo_id = $10", 
                [description, owner, priority, day, morning, afternoon, evening, duration, completed, id])
        } else if (completed) {
            const completeTodo = await pool.query("UPDATE todo SET completed = $1 WHERE todo_id = $2", [completed, id])
        }
        res.json("todo was updated")
    } catch (error) {
        console.error(error.message)
    }
};

// create todo
const createTodo = async (req, res) => {
    try {
        const {
            description, owner, priority, day, morning, afternoon, evening, duration
        } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description, owner, priority, day, morning, afternoon, evening, duration) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
            [description, owner, priority, day, morning, afternoon, evening, duration])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
}

  // delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo was deleted!")
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getTodos,
    getTodo,
    updateTodo,
    createTodo,
    deleteTodo
}