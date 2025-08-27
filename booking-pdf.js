// booking-pdf.js: Download ticket as PDF on Book Now
// Requires jsPDF library (https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js)

document.addEventListener('DOMContentLoaded', function() {
    const bookBtn = document.getElementById('bookNowBtn');
    if (!bookBtn) return;

    bookBtn.addEventListener('click', function() {
        // Collect ticket info
        const movie = localStorage.getItem('selectedMovie') || 'N/A';
        const ticketPrice = parseInt(localStorage.getItem('ticketPrice')) || 0;
        const selectedSeats = Array.from(document.querySelectorAll('.row .seat.selected'));
        const seatNumbers = selectedSeats.map((seat, idx) => {
            // Find seat index in all seats
            const allSeats = Array.from(document.querySelectorAll('.row .seat'));
            return allSeats.indexOf(seat) + 1;
        });
        const numTickets = selectedSeats.length;
        const totalPrice = Number(numTickets) * Number(ticketPrice);

        // Get date and time from localStorage and also from input (for real-time validation)
        const dateInput = document.getElementById('movie-date');
        const timeInput = document.getElementById('movie-time');
        const selectedDate = (dateInput && dateInput.value) || localStorage.getItem('selectedDate') || '';
        const selectedTime = (timeInput && timeInput.value) || localStorage.getItem('selectedTime') || '';

        // Remove previous error message if any
        let errorMsg = document.getElementById('pdf-error-msg');
        if (errorMsg) errorMsg.remove();

        // Validation: require at least one seat, date, and time
        if (numTickets === 0 && (!selectedDate || !selectedTime)) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'pdf-error-msg';
            errorMsg.textContent = 'Please select at least one seat, date, and time.';
            errorMsg.style.color = 'red';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.margin = '10px 0';
            bookBtn.parentNode.insertBefore(errorMsg, bookBtn);
            return;
        } else if (numTickets === 0) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'pdf-error-msg';
            errorMsg.textContent = 'Please select at least one seat.';
            errorMsg.style.color = 'red';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.margin = '10px 0';
            bookBtn.parentNode.insertBefore(errorMsg, bookBtn);
            return;
        } else if (!selectedDate || !selectedTime) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'pdf-error-msg';
            errorMsg.textContent = 'Please select date and time.';
            errorMsg.style.color = 'red';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.margin = '10px 0';
            bookBtn.parentNode.insertBefore(errorMsg, bookBtn);
            return;
        }
    });
});
