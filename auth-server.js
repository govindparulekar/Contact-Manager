let express = require("express");
let session = require("express-session");
const mongoose = require("mongoose");
let mongoDbSession = require("connect-mongodb-session")(session);


let app = express();

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


app.use(express.urlencoded({ extended: true }));
app.use(
    session(
        {
            secret : "this is session secret",
            resave : false,
            saveUninitialized : false
        }
    )
);

  

app.get("/",(req,res)=>{
    console.log(req.body);
    res.send("Hello this is auth server");
});

app.listen(5000,console.log("server listeneing on 5000!"));