# ExpressJS-Todo-List
A simple todo list web app in ExpressJS


## MongoDB Integration
For connecting Express app with MongoDB we will use [mongoose](https://www.npmjs.com/package/mongoose).

After installing MongoDB, run the server by running `mongod` from **cmd** or **terminal**. Now connect Express with MongoDB by
making a mongoose `connection`,

**app.js**
```
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', err => {
        console.log(`Connection error: ${err.message}`)
    })
```

1. `useNewUrlParser` is the new url parser for MongoDB Nodejs driver and for activating it we need to specify it explicitly.
2. `useUnifiedTopology` is the new topology engine which is how mongoose handles monitoring all the servers in a replica set or shared cluster.

Notice the line `process.env.DATABASE`, this comes from [dotenv](https://www.npmjs.com/package/dotenv), to install this package run,
`npm install --save-dev dotenv` and at the top of the **app.js** file add,

```
require('dotenv').config();
```

Now create a **.env** file in your root dir and add a variable, `DATABASE`,

```
DATABASE=mongodb://localhost:27017/todolist
```

**Make sure to ignore *.env* file in your repo.**

Now run the express server again or save the file to restart the server and if mongodb is running you will see the message,
**Mongoose connection open...** in your terminal.

## Schema & Models
Indexes in MongoDB help in efficient execution of queries. Without indexed in MongoDB, it has to perform a collection scan, that
is to scan every **document** in a **collection** to select those documents that match the query scan. If an appopriate index exists
for a query then MongoDB can use the index to limit the number of documents to scan.

For creating a Schema using mongoose, refer to [docs](https://www.npmjs.com/package/mongoose)

For our todo list app, we can create a simple schema like this,

**models/Todo.js**
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: { type: String, index: true, default: 'Todo thing', trim: true },
    description: { type: String, trim: true },
    date: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Todo', todoSchema);
```

In above code, we are defining type of the fields(we already have validation) and also using `trim` method from mongoose schema which
will trim any whitespaces from the user input. At last we are exporting the compiled model from Schema.

Now to let mongoose know about our schema model, we need to require this file in the **app.js** at the top or above the import for **index router**.

For listing all the todos stored in MongoDB, we can use `.find()` method of our model without any arguments,

**routes/index.js**
```
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');

...
    Todo.find()
        .then(todos => {
            res.render('index', { title: 'All todos', todos })
        });
```

For deleting a document, mongoose provides with methods like, `deleteOne` and for many `deleteMany`,

```
...
    Todo.deleteOne({ _id: req.param.id }, function(err) { console.log(err) })
        .then(() => res.redirect('/'));
```
