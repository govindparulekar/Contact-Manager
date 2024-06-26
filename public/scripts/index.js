window.addEventListener('load',function(){
	console.log("in index js");
	//Get action button container
	
	let actionBtnCont = $(".contact-action-cont");
	console.log(actionBtnCont);
	
	let getContactModal = $("#contact-submission-modal");
	let getContactModalType = getContactModal[0].dataset.type;
	
	
	
	//Event Listeners ---------------------------------------------------------------------
	
	//Add contact button listener
	$("#add-contact").on("click",event=>{
	console.log(event);
	
	getContactModal[0].dataset.type = "add";
	getContactModal.find('form')[0].reset();
	console.log(getContactModal.find('form'));
	
	})
	
	
	//Contact action buttons listener
	actionBtnCont.on("click", (actionBtn) => {
	console.log(actionBtn);
	let cid = actionBtn.currentTarget.dataset.cid;
	console.log(actionBtn.currentTarget.dataset.cid);
	let action = actionBtn.target.id;
	console.log(action);
	//let cid = actionBtn.target.par
	switch (action) {
		case "info":
		showContact(cid);
		break;
		case "edit":
		getContactModal[0].dataset.type = "edit"
		editContact(cid);
		break;
		case "delete":
		deleteContact(cid);
		break;
		default:
		break;
	}
	});
	
	
	//Common contact modal submission listener for add and edit actions
	$("#contact-submission-modal form").on("submit",function(event){
		event.preventDefault();
		console.log('prevented');
	
		//get cid
		let cid = $("#contact-submission-modal #cid").val();
	
		//get action type ( add or edir)
		let actionType = getContactModal[0].dataset.type;
		console.log(actionType);
	
		//get input fields
	
		let editFields = $("#contact-submission-modal :input");
		let name,contact,email,addr = null;
		editFields.each(function() {
			editFieldInp = $(this);
			switch (editFieldInp.attr("id")) {
				case "name":
				name = editFieldInp.val();
				break;
				case "contact":
				contact = editFieldInp.val();
				break;
				case "email":
				email = editFieldInp.val();
				break;
				case "addr":
				addr = editFieldInp.val();
				break;
			
				default:
				break;
			}
		});
		
	
		//console.log(contact);
		let contactData = {
			name : name,
			contact : contact,
			email : email,
			addr : addr,
			cid : cid
		}
		console.log(contactData);
	
		if(actionType == "add"){
	
		axios.post("/addContact",contactData)
		.then(data=>{
			alert(data.data.msg);
			window.location.href = "/";
	
		})
		.catch(error=>{
			alert(error);
		});
	
		}
		else{
		axios.post("/editContact",contactData)
		.then(data=>{
			alert(data.data.msg);
			window.location.href = "/";
	
		})
		.catch(error=>{
			alert(error);
		});
	
		}
	});
	
	//Logout button listener
	
	let logoutBtn = $("#logout-btn");
	
	logoutBtn.on("click",()=>{
	
		console.log("logout");
	
		axios.post("/logout")
		.then(res=>{
			alert(res.data.msg);
			window.location.href = "/login";
		})
		.catch(err=>{
			alert(err.data.msg);
		});
	})
	//-----------------------------------------------------------------------------------------------------
	
	
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
	let editFields = $("#contact-submission-modal :input");
	$('#cid').val(cid);
	console.log($('#cid').val());
	
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
	
	function deleteContact(cid) {
		console.log(cid);
		axios.delete("/deleteContact",{ data: { cid: cid } })
		.then(result=>{
			alert(result.data.msg);
			window.location.href = "/";
		})
		.catch(error=>{
			alert("error : "+error);
		});
	}
	
	
});






