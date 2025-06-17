// Constants for pricing
const TICKET_PRICE = 1499;
const SERVICE_FEE = 99;

// DOM elements
const bookingForm = document.getElementById('bookingForm');
const quantityInput = document.getElementById('ticketQuantity');
const ticketSummary = document.getElementById('ticketSummary');
const totalAmount = document.getElementById('totalAmount');
const confirmationMessage = document.getElementById('confirmationMessage');

const urlParams = new URLSearchParams(window.location.search);

const Price = parseInt((urlParams.get('Price') || "1499").replace(/,/g, ''), 10);

const standValue = decodeURIComponent(
  urlParams.get('Stand') || "North Stand"
);

// Update DOM elements
document.getElementById('price-detail').textContent = `Price: ₹${Price}`;
document.getElementById("stand").textContent = standValue;
document.getElementById("Standone").textContent = standValue;






function storeInLocalStorage(bookingData) {
    try {

        const existingBookings = JSON.parse(localStorage.getItem('ticketBookings')) || [];


        existingBookings.push(bookingData);

        localStorage.setItem('ticketBookings', JSON.stringify(existingBookings));

        console.log('Booking saved to local storage');
    } catch (error) {
        console.error('Error saving to local storage:', error);
    }
}


function storeBookingData(bookingData) {

    storeInLocalStorage(bookingData);


}


// Initialize order summary

function updateOrderSummary() {
    const quantity = parseInt(quantityInput.value);
    const subtotal = quantity * Price;
    const total = subtotal + SERVICE_FEE;

    ticketSummary.textContent = `${quantity} x ${standValue}: ₹${subtotal}`;
    totalAmount.innerHTML = `<strong>Total: ₹${total}</strong>`;
}

// Handle form submission
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all form values
    const bookingData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        },
        event: {
            name: "CSk vs RCB - North Stand",
            venue: "Narendra Modi Stadium, Ahmedabad",
            date: "March 7, 2024",
            time: "9:30 AM IST"
        },
        order: {
            ticketQuantity: parseInt(quantityInput.value),
            ticketPrice: Price,
            serviceFee: SERVICE_FEE,
            total: (parseInt(quantityInput.value) * Price) + SERVICE_FEE,
            bookingDate: new Date().toISOString(),
        }
    };

    // Store the booking data
    storeBookingData(bookingData);
    localStorage.setItem("customerName", bookingData.customer.name);
    localStorage.setItem("ticketQuantity", bookingData.order.ticketQuantity);
    localStorage.setItem("ticketPrice", bookingData.order.ticketPrice);
    localStorage.setItem("totalPrice", bookingData.order.total);
    localStorage.setItem("concertName", bookingData.event.name);
    window.location.href = "ticketCricketpayment.html";
    

});
document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);

        if (button.textContent === '+' && value < 10) {
            quantityInput.value = value + 1;
        } else if (button.textContent === '-' && value > 1) {
            quantityInput.value = value - 1;
        }

        updateOrderSummary();
    });
});
updateOrderSummary();
