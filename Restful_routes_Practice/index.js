const express = require('express');
const app = express();

const methodOverride = require('method-override')    // for patch and delete method


const {v4: uuid} = require('uuid');
const path = require('path');

app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));

// To parse incoming JSON in POST request body:
app.use(express.json());

// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'));


// GET /comments - list all comments
// POST /comments - Create a new comment 
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment

let posts = [
    {
        id:uuid(),
        user: 'Rishi',
        post: 'Hello everyone'
    },
    {
        id:uuid(),
        user: 'Naman',
        post: 'God bless you'
    }
]

// GET /comments - list all comments
app.get('/posts', (req,res) => {
    res.render('posts/allPost.ejs', {posts});
});

// Form for new post --
app.get('/posts/new' , (req,res) => {
    res.render('posts/new.ejs');
});

app.post('/posts', (req,res) => {
    const {user , post} = req.body;
    posts.push({id:uuid() , user , post});
    res.redirect('/posts');
});

app.get('/posts/:id' , (req,res) => {
    const {id} = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/show.ejs' , {post});
});

app.get('/posts/:id/edit' , (req , res) => {
    const {id} = req.params;
    const post = posts.find( p => p.id === id);
    res.render('posts/edit.ejs', {post});
});

app.patch('/posts/:id' , (req ,res) => {
    const {id} = req.params;
    const postFound =  posts.find( p => p.id === id);
    postFound.post = req.body.post;
    res.redirect('/posts');
})

app.delete('/posts/:id' , (req , res) => {
    const {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
})

app.listen(3000 , ()=> {
    console.log("Listening on port 3000 ......");
});


