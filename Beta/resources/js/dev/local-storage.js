//	HTML5 Local Storage

// Store File
//localStorage.setItem();
// Retrieve
//document.getElementById("result").innerHTML = localStorage.getItem("lastname");

// Store
let storage = ( data ) => {
    localStorage.setItem("file", JSON.stringify(data));
    console.clear();
    console.log(page);
    console.log(localStorage.getItem('file'));
    console.log('Save');
    console.dir(JSON.parse(localStorage.getItem('file')));
}
let getStorage = () => {
    let data = localStorage.getItem("file");
    console.log(data);
    //page = data;
}

let clearStorage = () => {
    localStorage.removeItem("file");
}

getStorage();

let autoStorage = setInterval( function(){
    storage( page );
}
, 5000 );
