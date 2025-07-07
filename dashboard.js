// Sample data for available turfs
const turfs = [
    { id: 1, name: "Green Field", location: "Downtown", price: 500 },
    { id: 2, name: "Sunny Arena", location: "Uptown", price: 700 },
    { id: 3, name: "City Sports", location: "Suburb", price: 600 }
];

function renderTurfs() {
    const turfList = document.getElementById('turf-list');
    turfList.innerHTML = '';
    turfs.forEach(turf => {
        const div = document.createElement('div');
        div.className = 'turf-card';
        div.innerHTML = `
            <h3>${turf.name}</h3>
            <p>Location: ${turf.location}</p>
            <p>Price per hour: ₹${turf.price}</p>
            <button onclick="bookTurf(${turf.id})">Book Now</button>
        `;
        turfList.appendChild(div);
    });
}

function getBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function setBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function renderBookings() {
    const bookings = getBookings();
    const tbody = document.querySelector('#bookingTable tbody');
    tbody.innerHTML = '';
    bookings.slice(-5).reverse().forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${b.turf}</td>
            <td>${b.name}</td>
            <td>${b.date}</td>
            <td>${b.time}</td>
        `;
        tbody.appendChild(row);
    });
}

function bookTurf(turfId) {
    const turf = turfs.find(t => t.id === turfId);
    const name = prompt(`Booking "${turf.name}"
Enter your name:`);
    const date = prompt("Enter booking date (YYYY-MM-DD):");
    const time = prompt("Enter booking time (HH:MM):");
    if (name && date && time) {
        const bookings = getBookings();
        bookings.push({ turf: turf.name, name, date, time });
        setBookings(bookings);
        renderBookings();
        alert(`Thank you, ${name}! Your booking for "${turf.name}" on ${date} at ${time} is confirmed.`);
    } else {
        alert("Booking cancelled or incomplete.");
    }
}

window.onload = function() {
    renderTurfs();
    renderBookings();
};
