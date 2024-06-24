window.addEventListener("load",function(){
    const regForm = document.getElementById("register-form");
    const formFields  = document.getElementsByTagName("input");
    console.log(regForm);

    regForm.addEventListener("submit",e=>{
        e.preventDefault();
        let uname = $('#uname').val();
        let pwd = $('#pwd').val();
        let email = $('#email').val();

        let userData = {
            uname : uname,
            pwd : pwd,
            email : email
        }

        console.log(userData);

        axios.post('/register', userData)
        .then(response=>{
            console.log(response);
            alert(response.data.msg);
            regForm.reset();
            
        })
        .catch(error=>{
            console.log(error);
            alert(response.data.msg);
        });

    })

})
    




// regForm.on("submit",(e)=>{
//     e.preventDefault();
//     console.log(alert("helo"));
//     alert("helo");
//     let uname = $('#uname');
//     let pwd = $('#pwd');
//     let email = $('#email');

//     let userData = {
//         uname : uname,
//         pwd : pwd,
//         email : email
//     }

//     axios.post('/register', userData)
//     .then(response=>{
//         alert(response);
//     })
//     .catch(error=>{
//         alert(error);
//     });

// })

