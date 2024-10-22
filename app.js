const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let tasks = [];

function time() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 15) return "Good Afternoon";
    else if (hour < 20) return "Good Evening";
    else return "Good Night";
}

app.post("/add-task", (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect("/todo");
});

app.post("/delete-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    if (!isNaN(taskId) && taskId >= 0 && taskId < tasks.length) {
        tasks.splice(taskId, 1);
    }
    res.redirect("/todo");
});

app.get("/welcome", (req, res) => {
    let name = "John";
    let good = time();
    res.render('welcome', { name, good });
});

app.get("/todo", (req, res) => {
    res.render('todo', { tasks });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
});