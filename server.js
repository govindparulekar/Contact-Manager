//Imports
let express = require("express");
const mongoose = require("mongoose");
let authRouter = require("./routes/auth");
const sessions = require('express-session');
const contactsController = require('./controller/contactsController');
const authController = require('./controller/authController')
const isAuth = require('./Middleware/isAuth');
const path = require('path');
//let axios = require("axios");
//vedant
//Server Initialisation
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://govindvp511:uXBhO9TQYLawaG1M@cluster0.ky8bhcg.mongodb.net/DBname";

mongoose
  .connect(
    uri
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(
  sessions({
    secret: 'some secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user",authRouter);

//Routes

//Contacts
app.get("/", isAuth,  contactsController.getAllContacts);

app.get("/getContact", contactsController.getSingleContact);

app.post("/addContact", contactsController.addcontact);

app.post("/editContact", contactsController.editContact);

app.delete("/deleteContact", contactsController.deleteContact);


//Login and register 

app.get("/user",(req,res)=>{
  res.render("login.ejs");
})

app.get("/register",(req,res)=>{
  res.render("register.ejs");
})

app.get("/login", (req,res)=>{
  res.render("login.ejs");
})

app.post("/register",authController.registerUser);
app.post("/login",authController.loginUser);
app.post("/logout",authController.logoutUser)

//Start the server
app.listen(port, () => console.log("Server is listing on 3000"));
