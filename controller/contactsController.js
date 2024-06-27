let Contact = require("../models/Contact");

exports.getAllContacts = async (req, res) => {
  console.log(req.session.userid);
  await Contact.find({ createdBy: req.session.userid })
    .then((contacts) => {
      console.log(contacts);
      if (contacts.length != 0) {
        res.render("index.ejs", {
          contacts: contacts,
          username: req.session.username,
        });
      } else {
        console.log("no contacts");
        res.render("index.ejs", {
          username: req.session.username,
        });
      }
      //res.json(contacts);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong", error: err });
    });
};

exports.getSingleContact = (req, res) => {
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
};

exports.addcontact = async (req, res) => {
  let contact = req.body;
  console.log(contact);

  const newContact = new Contact({
    createdBy: req.session.userid,
    name: contact.name,
    contact: contact.contact,
    email: contact.email,
    addr: contact.addr,
  });

  await newContact.save().then(res.status(200).json({ msg: "contact added" }));
};

exports.editContact = (req, res) => {
  let contact = req.body;
  console.log(contact);

  Contact.findByIdAndUpdate(contact.cid, contact, { new: true })
    .then((updatedContact) => {
      if (!updatedContact) {
        console.error("Contact not found");
        return;
      }

      res.status(200).json({ msg: "Contact Updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating contact:", error);
      res.status(400).json({ msg: "error updating contact" });
    })
    .finally(() => {
      //mongoose.disconnect(); // Close the connection when done
      // res.redirect("/contacts");
    });
};

exports.deleteContact = (req, res) => {
  let cid = req.body.cid;
  console.log("cid: " + cid);
  Contact.findOneAndDelete({ _id: cid })
    .then((deletedContact) => {
      if (!deletedContact) {
        res.status(404).json({ msg: "Contact not found" });
        return;
      }
      res.status(200).json({ msg: "Contact Deleted successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ msg: "Error deleting contact", error: error });
    });
};
