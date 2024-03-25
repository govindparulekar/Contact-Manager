//Get action button container

let actionBtnCont = $(".contact-action-cont");
console.log(actionBtnCont);

// console.log(actionBtnCont[1].dataset.cid);

actionBtnCont.on("click", (actionBtn) => {
  let cid = actionBtn.currentTarget.dataset.cid;
  console.log(actionBtn.currentTarget.dataset.cid);
  let action = actionBtn.target.id;
  //let cid = actionBtn.target.par
  switch (action) {
    case "info":
      showContact(cid);
      break;
    case "edit":
      editContact(cid);
      break;
    case "delte":
      deleteContact();
      break;
    default:
      break;
  }
});

function showContact(cid) {
  let modalData = $("div.modal-data");
  // console.log(modalData);
  let contact = null;
  console.log(cid);
  axios
    .get("/getContact", {
      params: {
        cid: cid,
      },
    })
    .then((data) => {
      console.log(data);
      contact = data;
      console.log(contact);
      modalData.each(function () {
        let modalDataCol = $(this);
        switch (modalDataCol.attr("id")) {
          case "name":
            console.log(modalDataCol);
            console.log(contact.name);
            modalDataCol.text(contact.data.name);
            break;
          case "contact":
            modalDataCol.text(contact.data.contact);
            break;
          case "email":
            modalDataCol.text(contact.data.email);
            break;
          case "addr":
            modalDataCol.text(contact.data.addr);
            break;

          default:
            break;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  // let data = {
  //     name : "Govind Parulekar",
  //     contact : "980232323",
  //     email : "govindvp511@gmail.com",
  //     addr : "aldskj asdjf;aljdf alsdjf lakjdflakjdfa akjfdldkjad"
  // }

  //console.log(viewContactModal);
}

function editContact(cid) {
  //Get input fields
  let editFields = $("#edit-contact-modal :input");
  console.log(editFields);

  let contact = null;
  console.log(cid);
  axios
    .get("/getContact", {
      params: {
        cid: cid,
      },
    })
    .then((data) => {
      contact = data;
      //Set fetched data to each input field
      editFields.each(function () {
        console.log($(this));
        editFieldInp = $(this);
        switch (editFieldInp.attr("id")) {
          case "name":
            editFieldInp.val(contact.data.name);
            break;
          case "contact":
            editFieldInp.val(contact.data.contact);
            break;
          case "email":
            editFieldInp.val(contact.data.email);
            break;
          case "addr":
            editFieldInp.val(contact.data.addr);
            break;

          default:
            break;
        }
      });
    });
}
function deleteContact(params) {}
