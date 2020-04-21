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
            res.render('index', { title: 'List Todos', todos });
        })
        .catch(() => console.log('CANNOT FETCH TODOS FROM DB'));
});

router.get('/add-todo', function(req, res, next) {
    res.render('add', {
        title: 'New Todo'
    });
});

router.post('/add-todo',
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

        if (errors.isEmpty()) {
            console.log(req.body);
            // todoList.push(req.body.todo);
            // SAVE INTO DB
            const todo = new Todo(req.body);
            todo.save()
                .then(() => {
                    res.redirect('/')
                })
                .catch(err => {
                    console.log(err);
                    res.render('index', {
                        title: 'Add Todo',
                        errors: err,
                        data: req.body,
                    });
                })
        } else {
            res.render('add', {
                title: 'Add Todo',
                errors: errors.array(),
                data: req.body,
            });
        }

        // req is an object full of info like form data or query parameters
        console.log(req.body);
    }
);

router.post('/remove/:id', function(req, res) {
    // todoList.splice(todoList.indexOf(req.params.id), 1);
    Todo.deleteOne({ _id: req.params.id }, function (err) {})
        .then(() => res.redirect('/'));
})

module.exports = router;
