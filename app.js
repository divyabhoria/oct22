const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


let tasks = [];
// let products = [
//     {"id": 1, "name": "TV", "price": 45000},
//     {"id": 2, "name": "Iphone", "price": 78000},
//     {"id": 3, "name": "AC", "price": 32000},
//     {"id": 4, "name": "Monitor", "price": 24440},
//     {"id": 5, "name": "Ipad", "price": 68000},
// ];
// let users = [
//     {"name": "Sam", "age": 23, "hobby": "Coin collecting"},
//     {"name": "John", "age": 27, "hobby": "Knives"},
//     {"name": "Winston", "age": 53, "hobby": "Guns"},
//     {"name": "Barney", "age": 42, "hobby": "Wine"},
//     {"name": "Luke", "age": 77, "hobby": "Stamp collecting"},
// ];

function time(){
    const hour = new Date().getHours();
    if(hour < 12) return "Good Morning";
    else if(hour < 15) return "Good Afternoon";
    else if(hour < 20) return "Good Evening";
    else return "Good Night";
}

app.get("/welcome", (req, res) => {
    let name = "John";
    let good = time();
    res.render('welcome', {name, good});
});

app.post("/add-task", (req, res) => {
    const newTask = req.body.task;
    if(newTask) tasks.push(newTask);
    res.redirect("/todo");
});

app.post("/delete-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    if(!isNaN(taskId) && taskId >= 0 && taskId < tasks.length){
        tasks.splice(taskId, 1);
    }
    res.redirect("/todo");
});

app.get("/todo", (req, res) => {
    res.render('todo', {tasks});
});

app.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    let productSearch = products;
    if(searchQuery){
        productSearch = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    res.render('products', {products: productSearch});
});

app.get("/profile1/:username", (req, res) => {
    const username = req.params.username;
    const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());
    if(user) res.render('profile1', {user});
    else res.status(404).send("User not found");
});

app.get("/search", (req, res) => {
    const searchQuery = req.query.q; 
    let searchResults = products;

    if (searchQuery) {
        searchResults = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    const message = searchResults.length === 0 ? "No results found" : null;

    res.render('search', { searchQuery, searchResults, message });
});



let posts = [];

app.get("/posts", (req, res) => {
    res.render('posts', { posts });
});

app.post("/posts", (req, res) => {
    const { title, body } = req.body;
    if (title && body) {
        posts.push({ title, body });
    }
    
    res.redirect("/posts"); 
});

app.get("/posts/:title", (req, res) => {
    const postTitle = req.params.title;
    const post = posts.find(p => p.title === postTitle);
    
    if (post) {
        res.render('postDetail', { post });
    } else {
        res.status(404).send("Post not found");
    }
});



let isLoggedIn = false; 
app.get("/", (req, res) => {
    res.render("index", { isLoggedIn });
});

app.get("/login", (req, res) => {
    isLoggedIn = true;
    res.redirect("/");
});
app.get("/logout", (req, res) => {
    isLoggedIn = false;
    res.redirect("/");
});

app.get("/profile1", (req, res) => {
    if (isLoggedIn) {
        const user = { name: "John Doe", age: 30, hobby: "Photography" }; // Example user
        res.render("profile1", { isLoggedIn, user });
    } else {
        res.redirect("/login");
    }
});



app.get("/contact", (req, res) => {
    res.render("contact", { error: null });
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.render("contact", { error: "All fields are required" });
    }

    res.render("thankyou", { name, email, message });
});


app.use(express.static(path.join(__dirname, 'public')));

let products = [
    {
        name: "TV",
        description: "A large screen television with 4K resolution.",
        image: "/images/tv.jpg"
    },
    {
        name: "Iphone",
        description: "A smartphone with advanced features and high-quality camera.",
        image: "/images/iphone.jpg"
    },
    {
        name: "AC",
        description: "An air conditioner with powerful cooling and energy efficiency.",
        image: "/images/ac.jpg"
    }
];
app.get("/catalog", (req, res) => {
    res.render("catalog", { products });
});
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const image = `/images/${req.file.filename}`;

    products.push({ name, description, image });

    res.redirect("/catalog");
});


app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
});