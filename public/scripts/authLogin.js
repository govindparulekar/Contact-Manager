window.addEventListener("load",function(){
    const loginForm = document.getElementById("login-form");
    const formFields  = document.getElementsByTagName("input");
    console.log(loginForm);

    loginForm.addEventListener("submit",e=>{
        e.preventDefault();
        let email = $('#email').val();
        let pwd = $('#pwd').val();

        let userData = {
            email : email,
            pwd : pwd,
        }

        console.log(userData);

        axios.post('/login', userData)
        .then(response=>{

            processRes(response);
            // console.log(response);
            // alert(response.data.msg);
            // loginForm.reset();
            // window.location.href = "/";
            
        })
        .catch(error=>{
            console.log(error);
            alert(response.data.msg);
        });

    })


    function processRes(response){
        if(response.data.statusCode == 0){
            alert(response.data.msg);
        }
        else if(response.data.statusCode == 1){
            window.location.href = "/";
        }
        else{
            alert(response.data.msg);
            window.location.href = "/login";
        }
    }

})
    


