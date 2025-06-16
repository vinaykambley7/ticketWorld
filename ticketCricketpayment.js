document.addEventListener("DOMContentLoaded", function() {
    const customerName = localStorage.getItem("customerName") || "Not provided";
    const quantity = localStorage.getItem("ticketQuantity") || "0";
    const ticketPrice = localStorage.getItem("ticketPrice") || "0";
    const totalPrice = localStorage.getItem("totalPrice") || "0";
    const concertName = localStorage.getItem("concertName") || "Not selected";

    document.getElementById("payment-seats").textContent = "Ticket Quantity: " + quantity;
    document.getElementById("payment-seattype").textContent = "Customer Name: " + customerName;
    document.getElementById("payment-seatprice").textContent = "Ticket Price: ₹" + ticketPrice;
    document.getElementById("payment-total").textContent = "Total Amount: ₹" + totalPrice;
    document.getElementById("payment-concert").textContent = "Event: " + concertName;


    // Set up payment method toggles
    const radioButtons = document.querySelectorAll('input[name="method"]');
    const upiFields = document.getElementById("upi-fields");
    const cardFields = document.getElementById("card-fields");

    // Initially hide all fields
    upiFields.style.display = 'none';
    cardFields.style.display = 'none';

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function() {
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

window.submitPayment = function() {
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
    } else if (selectedMethod.value === "card" || selectedMethod.value === "credit") {
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
    const name = localStorage.getItem("customerName") || "User";
    const quantity = localStorage.getItem("ticketQuantity") || "0";
    const ticketPrice = localStorage.getItem("ticketPrice") || "0";
    const total = localStorage.getItem("totalPrice") || "0";
    const concert = localStorage.getItem("concertName") || "N/A";

    document.getElementById("success-seatNum").textContent = quantity;
    document.getElementById("success-seattype").textContent = name;
    document.getElementById("success-seatprice").textContent = "₹" + ticketPrice;
    document.getElementById("success-Totalprice").textContent = "₹" + total;
    document.getElementById("success-movie").textContent = concert;

    $('#successModal').modal('show');

    setTimeout(() => {
        const checkmark = document.querySelector('.checkmark');
        if (checkmark) {
            checkmark.classList.add('checkmark--animated');
        }
    }, 200);
    setTimeout(() => {
        localStorage.removeItem("seatNumber");
        localStorage.removeItem("seatType");
        localStorage.removeItem("seatPrices");
        localStorage.removeItem("TotalPrice");
        localStorage.removeItem("concerts");

        // Redirect to thank-you page
        window.location.href = "thankyou.html";
    }, 2500);
}