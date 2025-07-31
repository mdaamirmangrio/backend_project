const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
var methodOverride = require('method-override')

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let {v4: uuidv4} = require('uuid');
uuidv4();

let posts = [
    {
        id: uuidv4(),
        username: "aamir",
        content: "this is my fist post at quora"
    },
     {
        id: uuidv4(),
        username: "umar",
        content: "he is second caliph in islam"
    },
     {
        id: uuidv4(),
        username: "muhammad asif",
        content: "iam pakistani best cricket bowler"
    },
     {
        id: uuidv4(),
        username: "Babar azam",
        content: "king of cricket the number one batter"
    },
     {
        id: uuidv4(),
        username: "shah rukh khan",
        content: "king of acting, best actor in world"
    },

];
app.get("/", (req, res) => {
res.send("server is working");
})

app.get("/posts", (req, res) => {
res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => { 
res.render("new.ejs")
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    posts.push({username, content, id: uuidv4()});
    
    res.redirect("/posts");
})


app.get("/posts/:id", (req, res) => {
let {id} = req.params
let post = posts.find((p) => id === p.id);
res.render("show.ejs", {post});
 });

 app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
    res.redirect("/posts");
})

app.patch("/posts/:id", (req, res) => { 
    let {id} = req.params;
    let {content} = req.body;
    let post = posts.find((p) => id === p.id);
    post.content = content;

    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => { 
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);


    res.redirect("/posts")
    // res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
}) 
