document.addEventListener("DOMContentLoaded", function() {

    const seats = document.querySelectorAll(".seat");
    const selectedSeatsInfo = document.getElementById("selectedSeatsInfo");
    const selectedSeatsList = document.getElementById("selectedSeatsList");
    const totalPriceEle = document.getElementById("totalPrice");
    const payNowBtn = document.getElementById("payNowBtn");

    let selectedSeats = [];
    let totalPrice = 0;
    
    function getMovieNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('concerts') || "No Concert Selected";
}

// Display the movie name
const concerts = getMovieNameFromURL();
document.getElementById('concert-name').textContent = `🎞️ Concert: ${concerts}`;
    
    
      function updateSelectioninfo() {
            if (selectedSeats.length === 0) {
                selectedSeatsInfo.style.display = "none";
                payNowBtn.disabled = true;
                return;
            }
            selectedSeatsInfo.style.display = "block";
            payNowBtn.disabled = false;

            selectedSeats.innerHTML = "";
            selectedSeats.forEach(seat => {
                const seatElement = document.createElement("div");
                seatElement.className = "selected-seat-item";
                seatElement.innerHTML = `<span>${seat.type} - ${seat.number}</span> <span>₹${seat.price} </span>`;
                selectedSeatsList.appendChild(seatElement);
            });
            totalPriceEle.textContent = totalPrice;
        }
    seats.forEach(seat => {
        seat.addEventListener('change', function() {
            const seatId = this.id;
            const seatNumber = this.getAttribute("data-seat-number");
            const seatPrice = parseInt(this.getAttribute("data-price"));
            const seatType = this.classList.contains('vip') ? "VIP" : this.classList.contains("middle") ? "Middle" : "Back";



            if (this.checked) {
                selectedSeats.push({
                    id: seatId,
                    number: seatNumber,
                    price: seatPrice,
                    type: seatType
                });
                totalPrice += seatPrice;

            } else {
                const seatIndex = selectedSeats.findIndex(seat => seat.id === seatId);
                if (seatIndex !== -1) {
                    totalPrice -= selectedSeats[seatIndex].price;
                    selectedSeats.splice(seatIndex, 1);
                }
            }
            updateSelectioninfo();
        });
    });
    payNowBtn.addEventListener("click", function() {
            if (selectedSeats.length === 0) {
                alert("Please select at least one seat")
                return;
            } 
        const seatNumbers = selectedSeats.map(seat => seat.number);
        const seatTypes = selectedSeats.map(seat => seat.type);
        const seatPrices = selectedSeats.map(seat => seat.price);

            localStorage.setItem("seatNumber", seatNumbers.join(","));
            localStorage.setItem("seatType", seatTypes);
            localStorage.setItem("seatPrices", seatPrices);
            localStorage.setItem("TotalPrice", totalPrice.toString());
            localStorage.setItem("concerts", concerts)
            window.location.href = "rocketpayment.html";
        updateSelectioninfo();
    });
   
});