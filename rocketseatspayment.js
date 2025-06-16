document.addEventListener("DOMContentLoaded", function () {
    const seatNum = localStorage.getItem("seatNumber") || "None";
    const seattype = localStorage.getItem("seatType") || "0";
    const seatpricee = localStorage.getItem("seatPrices") || "Not selected";
    const totalprice = localStorage.getItem("TotalPrice") || "0";
    const concerts = localStorage.getItem("concerts") || "Not selected";


    document.getElementById("payment-seats").textContent = "Selected Seats: " + seatNum;
    document.getElementById("payment-seattype").textContent = "Selected SeatsType: " + seattype;
    document.getElementById("payment-seatprice").textContent = "Seat Price : " + seatpricee;
    document.getElementById("payment-total").textContent = "Total Amount: ₹" + totalprice;
    document.getElementById("payment-concert").textContent = "concert: " + concerts;
    
    // Set up payment method toggles
    const radioButtons = document.querySelectorAll('input[name="method"]');
    const upiFields = document.getElementById("upi-fields");
    const cardFields = document.getElementById("card-fields");

    // Initially hide all fields
   upiFields.style.display = 'none';
   cardFields.style.display = 'none';

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function()  {
            upiFields.style.display = 'none';
            cardFields.style.display = 'none';

            if (this.value === "upi") {
                upiFields.style.display = 'block';
            } else if (this.value === "card" || this.value === "credit") {
                cardFields.style.display = 'block';
            }
        });
    });
});

window.submitPayment = function () {
    const selectedMethod = document.querySelector('input[name="method"]:checked');
    if (!selectedMethod) {
        alert("Please select a payment method!");
        return;
    }

    if (selectedMethod.value === "upi") {
        const upiId = document.getElementById("upi-id").value;
        if (!upiId) {
            alert("Enter your UPI ID");
            return;
        }
    }

     else if (selectedMethod.value === "card" || selectedMethod.value === "credit") {
        const cardNumber = document.getElementById("card-number").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardNumber || !expiry || !cvv) {
            alert("Enter all card details");
            return;
        }
    }

    // If validation passes, show success animation
    showSuccessAnimation();
}

function showSuccessAnimation() {
    // First check if elements exist before trying to set content
    const successeatnum = document.getElementById("success-seatNum");
    const successSeattype = document.getElementById("success-seattype");
    const successeatprice = document.getElementById("success-seatprice");
    const successtotal = document.getElementById("success-Totalprice");
    const sucessmovie = document.getElementById("success-movie")
    if (successeatnum && successSeattype && successeatprice && successtotal && sucessmovie) {
        successeatnum.textContent = localStorage.getItem("seatNumber") || "Not selected";
        successSeattype.textContent = localStorage.getItem("seatType") || "None";
        successeatprice.textContent = localStorage.getItem("seatPrices") || "0";
        successtotal.textContent = localStorage.getItem("TotalPrice") || "0";
        sucessmovie.textContent = localStorage.getItem("concerts") || "Not selected";
    }

    // Show the modal
    $('#successModal').modal('show');
    
    // Trigger animation
    setTimeout(() => {
        const checkmark = document.querySelector('.checkmark');
        if (checkmark) {
            checkmark.classList.add('checkmark--animated');
        }
    }, 200);
}
