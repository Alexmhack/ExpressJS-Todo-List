var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

let todoList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', todos: todoList });
});

router.post('/',
    [
        check('todo')
            .isLength({ min: 1 })
            .withMessage('Please enter a title for todo'),
        // check('todo')
        //     .isIn(todoList)
        //     .withMessage('Item already exists')
    ],
    function(req, res, next) {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            todoList.push(req.body.todo);
            res.render('index', { title: 'Add Todo', todos: todoList, message: 'Todo added' })
        } else {
            res.render('index', {
                title: 'Add Todo',
                errors: errors.array(),
                data: req.body
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
