const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (validatingForm()) {
        window.location.href = '../../homepage/index.html';
    }
})

function validatingForm(){
    const userVal = username.value.trim();
    const passwordVal = password.value.trim();

    let isValid = true;

    if(userVal===""){
        errormsg(username,"username is invalid");
        isValid = false;
    }
    else{
        successmsg(username);
    }

    if(passwordVal===""){
        errormsg(password,"password is required");
        isValid = false;
    }
    else if(passwordVal.length<8){
        errormsg(password,"password is atleast 8 digits");
        isValid = false;
    }
    else{
        successmsg(password);
    }
    
    return isValid;
}

function errormsg(element,message){
    const inputgroup = element.parentElement;
    inputgroup.classList.add("error");
    inputgroup.classList.remove("success");

    const error = inputgroup.querySelector(".error");
    error.innerHTML = message
}

function successmsg(element) {
    const inputgroup = element.parentElement;
    inputgroup.classList.add("success");
    inputgroup.classList.remove("error");
    
    const error = inputgroup.querySelector(".error"); 
    if (error) {
        error.innerHTML = "";
    }
}

