// Select all seat elements that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

// Get ticket price and movie from localStorage
const ticketPrice = parseInt(localStorage.getItem('ticketPrice')) || 150;
const selectedMovie = localStorage.getItem('selectedMovie') || '';

// Remove the old paraDiv movie name display if present
const oldMovieElem = document.getElementById('selected-movie');
if (oldMovieElem) oldMovieElem.remove();

// Move price per ticket and movie name to the right side of the screen
const screenContainer = document.querySelector('.screencontainer');
if (screenContainer) {
    let infoBox = document.getElementById('movie-info-box');
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'movie-info-box';
        infoBox.style.position = 'absolute';
        infoBox.style.top = screenContainer.offsetTop + 'px';
        infoBox.style.right = '-20px'; // Move flush to the right edge, can use negative value for full flush
        infoBox.style.left = 'unset';
        infoBox.style.transform = 'translateX(100%)'; // Push it fully to the right
        infoBox.style.background = '#f8f8f8';
        infoBox.style.border = '1px solid #ccc';
        infoBox.style.borderRadius = '8px';
        infoBox.style.padding = '16px 24px';
        infoBox.style.fontSize = '1.1em';
        infoBox.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
        infoBox.style.zIndex = '10';
        infoBox.style.minWidth = '220px';
        // Make sure the parent is positioned relatively for absolute child
        const parent = screenContainer.parentNode;
        if (parent && getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        parent.appendChild(infoBox);
    }
    infoBox.innerHTML = `<strong>Movie:</strong> ${selectedMovie}<br><strong>Price per ticket:</strong> ₹${ticketPrice}`;
}

// Remove price per ticket from below the total if it exists
const oldPriceElem = document.getElementById('price-per-ticket');
if (oldPriceElem) oldPriceElem.remove();

// Update selected count and total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    const totalPrice = selectedSeatsCount * ticketPrice;
    total.textContent = totalPrice;
    // No need to show price per ticket below total anymore
}

// Seat click event
const container = document.querySelector('.container');
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Save selected date and time to localStorage when booking
const bookNowBtn = document.getElementById('bookNowBtn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function(e) {
        const dateInput = document.getElementById('movie-date');
        const timeInput = document.getElementById('movie-time');
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        // Remove previous error message if any
        let errorMsg = document.getElementById('booking-error-msg');
        if (errorMsg) errorMsg.remove();
        // Validation: require at least one seat, date, and time
        if (!dateInput || !timeInput || selectedSeats.length === 0 || !dateInput.value || !timeInput.value) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'booking-error-msg';
            errorMsg.textContent = 'Please select at least one seat, date, and time.';
            errorMsg.style.color = 'red';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.margin = '10px 0';
            bookNowBtn.parentNode.insertBefore(errorMsg, bookNowBtn);
            return;
        }
        // Save to localStorage
        localStorage.setItem('selectedDate', dateInput.value);
        localStorage.setItem('selectedTime', timeInput.value);
        // Redirect to payment page
        window.location.href = 'payment.html';
    });
}

// Initial count and total
updateSelectedCount();
