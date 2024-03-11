function getDataFromDB(callback) {
    let data= null;


    setTimeout(() => {
        //connect to DB 
        //search for the data
        //fetch the data
        data = "Data from the DB";
        callback(data);
         
    }, 5000);
    

}

getDataFromDB((d)=>{
    console.log(d)
});

