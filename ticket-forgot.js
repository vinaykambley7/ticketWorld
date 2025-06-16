let forgotFormEl = document.getElementById("forgotForm");
let forgotEmailEl = document.getElementById("forgotEmail");
let forgotEmailErrEl = document.getElementById("forgotEmailErr");
let resetSectionEl = document.getElementById("resetSection");
let newPasswordEl = document.getElementById("newPassword");
let newPassErrEl = document.getElementById("newPassErr");
let confirmNewPasswordEl = document.getElementById("confirmNewPassword");
let confirmPassErrEl = document.getElementById("confirmPassErr");
let resetSuccessMsgEl = document.getElementById("resetSuccessMsg");


let currentEmail = "";
forgotFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let Email = forgotEmailEl.value.trim();
    forgotEmailErrEl.textContent = "";
    resetSuccessMsgEl.textContent = "";

    if (Email === "") {
        forgotEmailErrEl.textContent = "Please Enter Email";
        return;
    }
    let userData = localStorage.getItem(Email);
    if (!userData) {
        forgotEmailErrEl.textContent = "Email Not found";
        return;
    }
    currentEmail = Email;
    resetSectionEl.style.display = "block";
});
let resetBtnEl = document.getElementById("resetBtn");

resetBtnEl.addEventListener("click", function(){
    let newpass = newPasswordEl.value.trim();
    let confrimpass = confirmNewPasswordEl.value.trim();
    newPassErrEl.textContent = "";
    confirmPassErrEl.textContent = "";
    resetSuccessMsgEl.textContent = "";
    let isvalid = true;
    if(newpass.length < 8){
        newPassErrEl.textContent = "Password must be 8 characters";
        isvalid = false;
    }
    if(confrimpass !== newpass){
        newPassErrEl.textContent = "Password do not match.";
        isvalid = false;    }
        
   if(isvalid){
       let userData = JSON.parse(localStorage.getItem(currentEmail));
       userData.Password = newpass;
       localStorage.setItem(currentEmail, JSON.stringify(userData));
       resetSuccessMsgEl.textContent = "Password has been rest Sucessfully";
       setTimeout(()=> {
        window.location.href = "ticket-3.html";  
    }, 2000);
       forgotFormEl.reset();
       newPasswordEl.value = "";
       confirmNewPasswordEl.value = "";
       resetSectionEl.style.display = "none";
       
   }
})