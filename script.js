// script.js

// Initialize slots with 20 available slots
const slots = [
    { id: 1, name: "Slot 1", bookedCount: 0, bookings: [] },
    { id: 2, name: "Slot 2", bookedCount: 0, bookings: [] },
    { id: 3, name: "Slot 3", bookedCount: 0, bookings: [] }
];

// Load slots data from localStorage if available
const loadSlots = () => {
    const storedSlots = JSON.parse(localStorage.getItem('slots'));
    if (storedSlots) {
        slots.length = 0; // Clear the current slots array
        slots.push(...storedSlots); // Push stored slots into the slots array
    }
    renderSlots(); // Render the slots
};

// Render slots on the page
const renderSlots = () => {
    const slotsList = document.getElementById('slots-list');
    slotsList.innerHTML = ''; // Clear the list

    slots.forEach(slot => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${slot.name}</strong> - ${slot.bookedCount} / 20 booked 
            <button onclick="openBookingModal(${slot.id})" ${slot.bookedCount >= 20 ? 'disabled' : ''}>
                ${slot.bookedCount < 20 ? 'Book' : 'Fully Booked'}
            </button>
            <button onclick="viewBookings(${slot.id})">View Bookings</button>
        `;
        slotsList.appendChild(li);
    });
};

// Open booking modal
const openBookingModal = (slotId) => {
    const slot = slots.find(s => s.id === slotId);
    document.getElementById('slot-name').textContent = `Book ${slot.name}`;
    document.getElementById('booking-modal').style.display = 'flex';
    document.getElementById('email').dataset.slotId = slotId;  // Store slotId in the email input
};

// Close booking modal
const closeModal = () => {
    document.getElementById('booking-modal').style.display = 'none';
    document.getElementById('email').value = '';  // Clear email input
};

// Handle booking
const bookSlot = () => {
    const email = document.getElementById('email').value;
    const slotId = parseInt(document.getElementById('email').dataset.slotId);
    const slot = slots.find(s => s.id === slotId);

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    if (slot.bookedCount < 20) {
        // Add the email to the bookings array
        slot.bookings.push(email);
        slot.bookedCount += 1;

        // Store booking data in localStorage
        localStorage.setItem('slots', JSON.stringify(slots));

        // Render slots again
        renderSlots();
        closeModal();
    } else {
        alert("This slot is fully booked.");
    }
};

// Open the modal to view bookings for a particular slot
const viewBookings = (slotId) => {
    const slot = slots.find(s => s.id === slotId);
    const bookingsList = document.getElementById('bookings-list');
    
    bookingsList.innerHTML = ''; // Clear the list

    // Show the list of people who booked this slot
    slot.bookings.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        bookingsList.appendChild(li);
    });

    document.getElementById('view-bookings-modal').style.display = 'flex';
};

// Close the view bookings modal
const closeViewBookingsModal = () => {
    document.getElementById('view-bookings-modal').style.display = 'none';
};

// Initialize the app
loadSlots();
