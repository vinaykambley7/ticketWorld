let MyformEl = document.getElementById("Myform");
let fullNameEl = document.getElementById("fullName");
let emailEl = document.getElementById("Email");
let passwordEl = document.getElementById("Password");
let confrimPassEl = document.getElementById("confrimPass");

let nameErrEl = document.getElementById("nameErr");
let emailErrEl = document.getElementById("emailErr");
let passErrEl = document.getElementById("passErr");
let confrimErrEl = document.getElementById("confrimErr");

function RegisterForm(formDetail) {
    let isvalid = true;
    if (formDetail.fullname === "") {
        nameErrEl.textContent = "Enter FullName";
        isvalid = false;
    } else {
        nameErrEl.textContent = "";
    }
    if (formDetail.email === "") {
        emailErrEl.textContent = "Enter Email";
        isvalid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDetail.email)) {
        emailErrEl.textContent = "Enter Email Correctly";
        isvalid = false;
    } else {
        emailErrEl.textContent = "";
    }
    if (formDetail.password === "") {
        passErrEl.textContent = "Password is required";
        isvalid = false;
    } else if (formDetail.password.length < 8) {
        passErrEl.textContent = "Password must be atlest 8 characters";
        isvalid = false;
    } else {
        passErrEl.textContent = "";
    }
    if (formDetail.confrimPass === "") {
        confrimErrEl.textContent = "Confrim your Password";
        isvalid = false;
    } else if (formDetail.confrimPass !== formDetail.password) {
        confrimErrEl.textContent = "Password Mismatched";
        isvalid = false;
    } else {
        confrimErrEl.textContent = "";
    }
    return isvalid;
}

MyformEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let formDetail = {
        fullname: fullNameEl.value.trim(),
        email: emailEl.value.trim().toLowerCase(),
        password: passwordEl.value.trim(),
 
        confrimPass: confrimPassEl.value.trim()
        
    }
   if(RegisterForm(formDetail)) {
        // Create user data object (without confirmPass for security)
        const userData = {
            fullname: formDetail.fullname,
            email: formDetail.email,
            password: formDetail.password,
            registrationDate: new Date().toISOString(),
            phone: "8074236286"
        };
        
        // Store user data and set as current user
        localStorage.setItem(userData.email, JSON.stringify(userData));
        localStorage.setItem('currentUser', userData.email);
        
        alert("Registered Successfully!");
        MyformEl.reset();
        
        setTimeout(() => {
            window.location.href = "ticket-3.html"; // Redirect to profile page
        }, 1000);
    } else {
        // Errors are already shown by RegisterForm function
    }
})