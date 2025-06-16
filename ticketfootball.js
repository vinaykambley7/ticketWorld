document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const matchSelectionSection = document.getElementById('match-selection');
    const seatSelectionSection = document.getElementById('seat-selection');
    const bookingConfirmationSection = document.getElementById('booking-confirmation');
    const selectMatchBtn = document.getElementById('select-match-btn');
    const backToMatchesBtn = document.getElementById('back-to-matches-btn');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    const newBookingBtn = document.getElementById('new-booking-btn');
    const selectedMatchInfo = document.getElementById('selected-match-info');
    const selectedSeatsInfo = document.getElementById('selected-seats-info');
    const selectedSeatsVisual = document.getElementById('selected-seats-visual');
    const totalPriceElement = document.getElementById('total-price');
    const confirmationDetails = document.getElementById('confirmation-details');
    
    // Payment modal elements
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const upiTab = document.getElementById('upi-tab');
    const cardTab = document.getElementById('card-tab');
    const confirmUpiPaymentBtn = document.getElementById('confirm-upi-payment');
    const confirmCardPaymentBtn = document.getElementById('confirm-card-payment');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    
    const matchCards = document.querySelectorAll('.match-card');
    const stands = {
        north: document.querySelector('.north .seats-grid'),
        south: document.querySelector('.south .seats-grid'),
        east: document.querySelector('.east .seats-grid'),
        west: document.querySelector('.west .seats-grid')
    };
    
    // Variables to store selected data
    let selectedMatch = null;
    let selectedSeats = [];
    const seatPrices = {
        north: 50,
        south: 40,
        east: 60,
        west: 60
    };
    
    // Format card number input
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 16) {
            value = value.substring(0, 16);
        }
        
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });
    
    // Format expiry date input
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Format CVV input
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
    
    // Generate seats for the stadium
    function generateSeats() {
        // Clear existing seats
        for (const stand in stands) {
            stands[stand].innerHTML = '';
        }
        
        // Generate seats for each stand
        for (const stand in stands) {
            const standElement = stands[stand];
            const rows = stand === 'north' || stand === 'south' ? 5 : 8;
            const cols = stand === 'north' || stand === 'south' ? 10 : 4;
            
            for (let row = 1; row <= rows; row++) {
                for (let col = 1; col <= cols; col++) {
                    const seat = document.createElement('div');
                    seat.className = 'seat';
                    seat.textContent = `${stand[0].toUpperCase()}${row}-${col}`;
                    seat.dataset.stand = stand;
                    seat.dataset.row = row;
                    seat.dataset.col = col;
                    seat.dataset.price = seatPrices[stand];
                    
                    // Randomly determine seat status (75% available, 20% occupied, 5% VIP)
                    const random = Math.random();
                    if (random < 0.2) {
                        seat.classList.add('occupied');
                    } else if (random < 0.25) {
                        seat.classList.add('vip');
                        seat.dataset.price = seatPrices[stand] * 1.5;
                    } else {
                        seat.classList.add('available');
                    }
                    
                    seat.addEventListener('click', toggleSeatSelection);
                    standElement.appendChild(seat);
                }
            }
        }
    }
    
    // Toggle seat selection
    function toggleSeatSelection(e) {
        const seat = e.target;
        
        if (seat.classList.contains('occupied')) {
            return;
        }
        
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s.id !== seat.textContent);
        } else {
            // Check if we've reached maximum seats (10)
            if (selectedSeats.length >= 10) {
                alert('You can select a maximum of 10 seats per booking.');
                return;
            }
            
            seat.classList.add('selected');
            selectedSeats.push({
                id: seat.textContent,
                stand: seat.dataset.stand,
                row: seat.dataset.row,
                col: seat.dataset.col,
                price: parseFloat(seat.dataset.price),
                type: seat.classList.contains('vip') ? 'VIP' : 'Regular'
            });
        }
        
        updateSeatSelectionInfo();
    }
    
    // Update seat selection information
    function updateSeatSelectionInfo() {
        if (selectedSeats.length === 0) {
            selectedSeatsInfo.textContent = 'No seats selected yet';
            totalPriceElement.textContent = 'Total: $0';
            selectedSeatsVisual.innerHTML = '';
            confirmBookingBtn.disabled = true;
            return;
        }
        
        const seatsList = selectedSeats.map(seat => `${seat.id} (${seat.type})`).join(', ');
        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        
        selectedSeatsInfo.textContent = `Selected seats (${selectedSeats.length}):`;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        
        // Update visual representation of selected seats
        selectedSeatsVisual.innerHTML = '';
        selectedSeats.forEach(seat => {
            const seatBadge = document.createElement('span');
            seatBadge.className = `seat-badge ${seat.type.toLowerCase()}`;
            seatBadge.textContent = seat.id;
            selectedSeatsVisual.appendChild(seatBadge);
        });
        
        confirmBookingBtn.disabled = false;
    }
    
    // Handle match selection
    matchCards.forEach(card => {
        card.addEventListener('click', function() {
            matchCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedMatch = {
                id: this.dataset.matchId,
                teams: this.querySelector('.teams').textContent.replace(/\s+/g, ' ').trim(),
                info: Array.from(this.querySelectorAll('.match-info span'))
                    .map(span => span.textContent.trim()).join(' | ')
            };
            selectMatchBtn.disabled = false;
        });
    });
    
    // Proceed to seat selection
    selectMatchBtn.addEventListener('click', function() {
        matchSelectionSection.classList.remove('active');
        seatSelectionSection.classList.add('active');
        selectedMatchInfo.textContent = `${selectedMatch.teams} | ${selectedMatch.info}`;
        generateSeats();
    });
    
    // Go back to match selection
    backToMatchesBtn.addEventListener('click', function() {
        seatSelectionSection.classList.remove('active');
        matchSelectionSection.classList.add('active');
        selectedSeats = [];
    });
    
    // Show payment modal when confirming booking
    confirmBookingBtn.addEventListener('click', function() {
        paymentModal.classList.add('active');
    });
    
    // Close modal when clicking outside
    paymentModal.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
        }
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        paymentModal.classList.remove('active');
    });
    
    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs and buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.payment-tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Handle UPI payment
    confirmUpiPaymentBtn.addEventListener('click', function() {
        const upiId = document.getElementById('upi-id').value.trim();
        
        if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId)) {
            alert('Please enter a valid UPI ID (e.g., yourname@upi)');
            return;
        }
        
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate payment processing
        setTimeout(() => {
            processPayment('UPI', upiId);
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-dollar-sign"></i> Pay Now';
        }, 1500);
    });
    
    // Handle card payment
    confirmCardPaymentBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardName = document.getElementById('card-name').value.trim();
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return;
        }
        
        if (!cardName) {
            alert('Please enter the name on card');
            return;
        }
        
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return;
        }
        
        if (!cvv || cvv.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return;
        }
        
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate payment processing
        setTimeout(() => {
            processPayment('Card', `****${cardNumber.slice(-4)}`);
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-rupee-sign"></i> Pay Now';
        }, 1500);
    });
    
    // Process payment and show confirmation
    function processPayment(method, details) {
        paymentModal.classList.remove('active');
        seatSelectionSection.classList.remove('active');
        bookingConfirmationSection.classList.add('active');
        
        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        const bookingDate = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        confirmationDetails.innerHTML = `
            <div class="confirmation-detail">
                <p><strong>Match:</strong> ${selectedMatch.teams}</p>
                <p><strong>Date:</strong> ${selectedMatch.info}</p>
            </div>
            <div class="confirmation-detail">
                <p><strong>Seats (${selectedSeats.length}):</strong></p>
                <ul>
                    ${selectedSeats.map(seat => `
                        <li>
                            <span>${seat.id} (${seat.type})</span>
                            <span>$${seat.price.toFixed(2)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="confirmation-detail">
                <p><strong>Payment Method:</strong> ${method} (${details})</p>
                <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
                <p><strong>Booking Reference:</strong> #${Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Booking Date:</strong> ${bookingDate}</p>
            </div>
            <p class="confirmation-note">An email confirmation has been sent to your registered email address. Please present your booking reference at the stadium entrance.</p>
        `;
    }
    
    // Start new booking
      // Start new booking
    newBookingBtn.addEventListener('click', function() {
        bookingConfirmationSection.classList.remove('active');
        matchSelectionSection.classList.add('active');
        
        // Reset all selections
        matchCards.forEach(card => card.classList.remove('selected'));
        selectedMatch = null;
        selectedSeats = [];
        selectMatchBtn.disabled = true;
        
        // Clear payment form fields
        document.getElementById('upi-id').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('card-name').value = '';
        document.getElementById('expiry-date').value = '';
        document.getElementById('cvv').value = '';
    });

    // Initialize the page
    function init() {
        matchSelectionSection.classList.add('active');
        seatSelectionSection.classList.remove('active');
        bookingConfirmationSection.classList.remove('active');
        paymentModal.classList.remove('active');
        selectMatchBtn.disabled = true;
        confirmBookingBtn.disabled = true;
    }

    // Start the application
    init();
});