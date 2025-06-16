document.addEventListener("DOMContentLoaded", function(){
        let currentUserEmail = localStorage.getItem("currentUser")
        
    if (!currentUserEmail){
          alert("Please register or login first");
          return;

    }
         const userData = JSON.parse(localStorage.getItem(currentUserEmail))
         if (!userData){
               alert("User data not found");
               return;
         }
          document.getElementById("emailEl").textContent = userData.email || "Not provided";
          document.getElementById("NamePro").textContent = userData.fullname || "Not Provided"
          document.getElementById("PhoneEl").textContent = userData.phone || "Not provided";
          const regDate = new Date(userData.registrationDate);
          document.getElementById("date").textContent = regDate.toLocaleDateString() ;
          document.getElementById("Member").textContent = regDate.toLocaleDateString() ;

    
})


