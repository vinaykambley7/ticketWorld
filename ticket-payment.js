document.addEventListener("DOMContentLoaded", function () {
    const seats = localStorage.getItem("selectedSeats") || "None";
    const total = localStorage.getItem("totalAmount") || "0";
    const movie = localStorage.getItem("movieName") || "Not selected";

    document.getElementById("payment-seats").textContent = "Selected Seats: " + seats;
    document.getElementById("payment-total").textContent = "Total Amount: ₹" + total;
    document.getElementById("payment-movie").textContent = "🎞️ Movie: " + movie;

    // Set up payment method toggles
    const radioButtons = document.querySelectorAll('input[name="method"]');
    const upiFields = document.getElementById("upi-fields");
    const cardFields = document.getElementById("card-fields");

    // Initially hide all fields
    upiFields.style.display = 'none';
    cardFields.style.display = 'none';

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () => {
            upiFields.style.display = 'none';
            cardFields.style.display = 'none';

            if (radio.value === "upi") {
                upiFields.style.display = 'block';
            } else if (radio.value === "card" || radio.value === "credit") {
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

    if (selectedMethod.value === "card" || selectedMethod.value === "credit") {
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
    const successMovie = document.getElementById("success-movie");
    const successSeats = document.getElementById("success-seats");
    const successAmount = document.getElementById("success-amount");
    
    if (successMovie && successSeats && successAmount) {
        successMovie.textContent = localStorage.getItem("movieName") || "Not selected";
        successSeats.textContent = localStorage.getItem("selectedSeats") || "None";
        successAmount.textContent = localStorage.getItem("totalAmount") || "0";
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
   
    
