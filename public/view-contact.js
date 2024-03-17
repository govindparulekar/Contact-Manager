//Get action button container
let actionBtnCont = $(".contact-action-cont");
console.log(actionBtnCont[1].dataset.cid);


actionBtnCont.on("click",(actionBtn)=>{

    console.log(actionBtn.currentTarget.dataset.cid);
    let action = actionBtn.target.id;
    //let cid = actionBtn.target.par
    switch (action) {
        case "info": showContact();
            break;
        case "edit": editContact();
            break;
        case "delte": deleteContact();
        break;
        default:
            break;
    }
})


function showContact(params) {
    let data = {
        name : "Govind Parulekar",
        contact : "980232323",
        email : "govindvp511@gmail.com",
        addr : "aldskj asdjf;aljdf alsdjf lakjdflakjdfa akjfdldkjad"
    }

    let modalData = $('div.modal-data');
        
    modalData.each(function(){
        let modalDataCol = $(this);
      
        switch (modalDataCol.attr('id')) {
            case 'name': modalDataCol.text(data.name);
            break;
            case 'contact': modalDataCol.text(data.contact);
            break;
            case 'email': modalDataCol.text(data.email);
            break;
            case 'addr': modalDataCol.text(data.addr);
            break;
        
            default:
                break;
        }
        
    });
    

    //console.log(viewContactModal);

    
}

function editContact(params) {
    
}
function deleteContact(params) {
    
}