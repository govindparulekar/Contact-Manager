



//Get action button container

let actionBtnCont = $(".contact-action-cont");
console.log(actionBtnCont);



   // console.log(actionBtnCont[1].dataset.cid);


    actionBtnCont.on("click",(actionBtn)=>{
        let cid = actionBtn.currentTarget.dataset.cid;
        console.log(actionBtn.currentTarget.dataset.cid);
        let action = actionBtn.target.id;
        //let cid = actionBtn.target.par
        switch (action) {
            case "info": showContact(cid);
                break;
            case "edit": editContact();
                break;
            case "delte": deleteContact();
            break;
            default:
                break;
        }
    })


    function showContact(cid) {
        let data = null;
        console.log(cid);
        axios.get('/getContact/',{
            cid :  cid
        })
        .then(contact =>{
            data = contact;
        })
        .catch(error =>{
            console.log(error);
        });
        // let data = {
        //     name : "Govind Parulekar",
        //     contact : "980232323",
        //     email : "govindvp511@gmail.com",
        //     addr : "aldskj asdjf;aljdf alsdjf lakjdflakjdfa akjfdldkjad"
        // }

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
        let data = {
            name : "Govind Parulekar",
            contact : "980232323",
            email : "govindvp511@gmail.com",
            addr : "aldskj asdjf;aljdf alsdjf lakjdflakjdfa akjfdldkjad"
        }

        //Get input fields 
        let editFields = $('#edit-contact-modal :input');
        console.log(editFields);


        //Set fetched data to each input field
        editFields.each(function () {
            console.log($(this));
            editFieldInp = $(this);
            switch (editFieldInp.attr('id')) {
                case 'name': editFieldInp.val(data.name);
                break;
                case 'contact': editFieldInp.val(data.contact);
                break;
                case 'email': editFieldInp.val(data.email);
                break;
                case 'addr': editFieldInp.val(data.addr);
                break;
            
                default:
                    break;
            }
        });

    }
    function deleteContact(params) {
        
    }


