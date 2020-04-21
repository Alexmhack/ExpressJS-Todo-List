var express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

var router = express.Router();
const Todo = mongoose.model('Todo');

let todoList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    Todo.find()
        .then(todos => {
            res.render('index', { title: 'Express', todos });
        })
        .catch(() => console.log('CANNOT FETCH TODOS FROM DB'));
});

router.post('/',
    [
        check('title')
            .isLength({ min: 1 })
            .withMessage('Please enter a title for todo')
        // check('todo')
        //     .isIn(todoList)
        //     .withMessage('Item already exists')
    ],
    function(req, res, next) {
        const errors = validationResult(req);

        Todo.find()
            .then(todos => todoList = todos)
            .catch(() => console.log('CANNOT FETCH TODOS FROM DB'));

        if (errors.isEmpty()) {
            console.log(req.body);
            // todoList.push(req.body.todo);
            // SAVE INTO DB
            const todo = new Todo(req.body);
            todo.save()
                .then(() => {
                    res.render('index', { title: 'Add Todo', todos: todoList, message: 'Todo added' })
                })
                .catch(err => {
                    console.log(err);
                    res.render('index', {
                        title: 'Add Todo',
                        errors: err,
                        data: req.body,
                        todos: todoList
                    });
                })
        } else {
            res.render('index', {
                title: 'Add Todo',
                errors: errors.array(),
                data: req.body,
                todos
            });
        }

        // req is an object full of info like form data or query parameters
        console.log(req.body);
    }
);

router.post('/remove/:todo', function(req, res) {
    console.log(todoList);
    todoList.splice(todoList.indexOf(req.params.todo), 1);
    console.log(todoList);
    res.redirect('/')
})

module.exports = router;
