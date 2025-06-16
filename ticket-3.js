let EmailEl = document.getElementById("Email");
let PassWordEl = document.getElementById("Password");
let ErrMsgEl = document.getElementById("ErrMsg");
let PassErrMsgEl = document.getElementById("PassErrMsg");
let SubBtnEl = document.getElementById("SubBtn");
let myFormEl = document.getElementById("myForm");



function validateForm(){
    
    let email = EmailEl.value.trim().toLowerCase();
    let password = PassWordEl.value.trim();
    
    let userData = localStorage.getItem(email);
    if(userData){
        let userobj = JSON.parse(userData);
        if(userobj.password === password){
            alert("Login Sucessfull")
            window.location.href = "ticket-main.html"
        }else{
            alert("Incorrect Password")
        }
    }else{
          alert("No accont found with this email")
    }
    
    
}
let regBtnEl = document.getElementById("regBtn");
document.addEventListener("DOMContentLoaded", function(){
    let regBtnEl = document.getElementById("regBtn");
    if(regBtnEl){
        regBtnEl.addEventListener("click", function(event){
            event.preventDefault();
            window.location.href = "ticket-4.html"; // Redirect to Registration Page

        })
    }
})
myFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    
    validateForm()
    
})