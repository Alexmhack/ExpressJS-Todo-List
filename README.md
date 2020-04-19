# ExpressJS-Todo-List
A simple todo list web app in ExpressJS

Please refer Offical [docs](https://expressjs.com/en/starter/installing.html) for more info.

# Getting Started
Inside a folder, initialize npm project by running, `npm init` and then install `express` by running, `npm install --save express` or if you don't want to install express as a dependency then use `npm install --no-save express`

Now create a file named **app.js** in the root of your folder, we will be running a server which returns `Hello World!` in response.

**app.js**
```
const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('App is listening on http://localhost:${port}'));
```

For running our server, simply run this file using, `node app.js` and head over to [http://localhost:3000](http://localhost:3000).

## Express Generator
*Express generator* will create a project skeleton for us just like *django-admin startproject* command creates a django project.

Use express generator by, `npx express-generator`. This command will create some files and folders which is the default structure of express project, you can change it as per your needs.

If you have previous version of `npx`, then install express globally using, `npx install --global express-generator`.
Now run, `express -h` and all the command options are displayed.

By default `express-generator` uses **pug(jade)** as the view engine, but you can specify other views using, `--view=` option.

After the project skeleton is ready, install all dependencies using, `npm install`. Start the server by running, `set DEBUG=your-project-name && npm start`.

Here `DEBUG=your-project-name:*` means you are telling nodejs that you want to turn on logging for debugging purposes. Here `your-project-name` is the name of your project which can be found in **package.json** file with key `"name": "some-name"`.

Then load [http://localhost:3000/](http://localhost:3000/) in your browser to access the app.

# Basic Routing
Checkout **routes/index.js** file and you will find route defined for root path, which simply renders a template with some context.

Just like this `get` route, you can similarly create,

```
router.post('/', function(req, res, next) {
    res.render('index', { title: 'POST request' })
}))
```

Here, `'index'` is the view name which refers to the file **views/index.jade** which extends **views/layout.jade** file.

# Serving static files using Express
In **app.js** file, find the piece of code which says, `app.use(express.static(path.join(__dirname, 'public')));` and change
it to,

```
...
app.use('/static', express.static(path.join(__dirname, 'public')));
```

Now static files can be accessed at [localhost:3000/static/images/image.png](http://localhost:3000/static/images/image.png)
