const router = require("express").Router();

const {
    getTodos,
    getTodo,
    updateTodo,
    createTodo,
    deleteTodo,
} = require("../controllers/todos.controller");

router.get("/todos", getTodos);
router.get('/todos/:id', getTodo);
router.put('/todos/:id', updateTodo);
router.post('/todos', createTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;