//Imports
let express = require("express");
let contacts = require("./contacts.json");
const mongoose = require("mongoose");
let Contact = require("./models/Contact");

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

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

//Get all contacts
app.get("/contacts", (req, res) => {
  //res.render("index.ejs");
  Contact.find()
    .then((contacts) => {
      res.render("index.ejs", {
        contacts: contacts,
      });
      //res.json(contacts);
    })
    .catch((err) => {
      res.status(404).json({ msg: "No contacts found" });
    });
});
//Get contact by name
app.get("/getContact", (req, res) => {
  let cid = req.query.cid;
  console.log(cid);

  Contact.findOne({ _id: cid })
    .then((contact) => {
      if (contact.length != 0) {
        res.json(contact);
      } else {
        throw "no contact found!";
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
      //res.json({})
    });
});

//Add contact
app.post("/addContact", async (req, res) => {
  let contact = req.body;
  console.log(contact);

  const newContact = new Contact({
    name: contact.name,
    contact: contact.contact,
    email: contact.email,
    addr: contact.addr,
  });

  await newContact.save().then(res.status(200).json({ msg: "contact added" }));
});

//app.put

//Start the server
app.listen(port, () => console.log("Server is listing on 3000"));
