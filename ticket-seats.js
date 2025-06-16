const seats = document.querySelectorAll('.seat');
const selectedCount = document.getElementById('selected-count');
const selectedSeats = document.getElementById('selected-seats');
const totalPrice = document.getElementById('total-price');
const payBtn = document.getElementById('pay-btn');
const balconyPrice = 250;
const regularPrice = 150;

let selectedSeatLabels = []; // 🔧 Make these global
let totalAmount = 0;
// Function to get URL parameter
function getMovieNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || "No Movie Selected";
}

// Display the movie name
const movieName = getMovieNameFromURL();
document.getElementById('movie-name').textContent = `🎞️ Movie: ${movieName}`;

function getRowLetter(rowIndex) {
    return String.fromCharCode(65 + rowIndex); // A, B, C, ...
}

function updateSeatInfo() {
    const allRows = document.querySelectorAll('.seating-area .row');
    selectedSeatLabels = [];
    totalAmount = 0;
    let count = 0;

    allRows.forEach((row, rowIndex) => {
        const seatInputs = row.querySelectorAll('.seat');
        seatInputs.forEach((seat, seatIndex) => {
            if (seat.checked) {
                const label = `${getRowLetter(rowIndex)}${seatIndex + 1}`;
                selectedSeatLabels.push(label);
                count++;
                totalAmount += seat.classList.contains('balcony') ? balconyPrice : regularPrice;
            }
        });
    });

    selectedCount.textContent = `Selected Seats: ${count}`;
    selectedSeats.textContent = selectedSeatLabels.length > 0 ?
        `Seats: ${selectedSeatLabels.join(', ')}` :
        `Seats: None`;
    totalPrice.textContent = `Total Price: ₹${totalAmount}`;
    payBtn.disabled = count === 0;

}
payBtn.addEventListener('click', () => {

localStorage.setItem("selectedSeats", selectedSeatLabels.join(","));
localStorage.setItem("totalAmount", totalAmount.toString());
localStorage.setItem("movieName", movieName); // from earlier


    window.location.href = "ticket-payment.html";
});


// Listen to seat changes
document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('change', updateSeatInfo);
});


// Initial load
updateSeatInfo();