// Sample data for available cricket turfs
const cricketTurfs = [
    { id: 1, name: "Cricket Arena", location: "Mumbai", price: 1200 },
    { id: 2, name: "Pitch Masters", location: "Delhi", price: 1500 }
];
const footballTurfs = [
    { id: 1, name: "Goal Ground", location: "Kolkata", price: 900 },
    { id: 2, name: "Soccer Hub", location: "Pune", price: 1100 }
];
const badmintonTurfs = [
    { id: 1, name: "Shuttle Court", location: "Delhi", price: 400 },
    { id: 2, name: "Smash Arena", location: "Mumbai", price: 500 }
];

function renderTurfs(tab) {
    let turfs = cricketTurfs;
    let container = document.getElementById('tab-content-cricket');
    if (tab === 'football') {
        turfs = footballTurfs;
        container = document.getElementById('tab-content-football');
    } else if (tab === 'badminton') {
        turfs = badmintonTurfs;
        container = document.getElementById('tab-content-badminton');
    }
    container.innerHTML = '';
    turfs.forEach(turf => {
        const div = document.createElement('div');
        div.className = 'turf-card';
        div.innerHTML = `
            <h3>${turf.name}</h3>
            <p>Location: ${turf.location}</p>
            <p>Price per hour: ₹${turf.price}</p>
            <label for="time-${tab}-${turf.id}">Select Time:</label>
            <input type="time" id="time-${tab}-${turf.id}" style="margin-bottom:8px;">
            <button onclick="bookTurfTabWithTime('${tab}',${turf.id})">Book Now</button>
        `;
        container.appendChild(div);
    });
}

window.bookTurfTabWithTime = function(tab, turfId) {
    let turfs = cricketTurfs;
    let sport = 'Cricket';
    if (tab === 'football') { turfs = footballTurfs; sport = 'Football'; }
    if (tab === 'badminton') { turfs = badmintonTurfs; sport = 'Badminton'; }
    const turf = turfs.find(t => t.id === turfId);
    const name = prompt(`Booking "${turf.name}"
Enter your name:`);
    const date = prompt("Enter booking date (YYYY-MM-DD):");
    const time = document.getElementById(`time-${tab}-${turf.id}`).value;
    if (name && date && time) {
        const bookings = getBookings();
        bookings.push({ turf: turf.name, name, date, time, sport, price: turf.price });
        setBookings(bookings);
        renderBookings(tab);
        alert(`Thank you, ${name}! Your booking for "${turf.name}" on ${date} at ${time} is confirmed.\nCost: ₹${turf.price}`);
    } else {
        alert("Booking cancelled or incomplete.");
    }
}

function getBookings() {
    return JSON.parse(localStorage.getItem('cricketBookings') || '[]');
}

function setBookings(bookings) {
    localStorage.setItem('cricketBookings', JSON.stringify(bookings));
}

function renderBookings(tab) {
    const bookings = getBookings();
    const tbody = document.querySelector('#bookingTable tbody');
    tbody.innerHTML = '';
    let filtered = bookings;
    if (tab) {
        // Only show bookings for the selected tab (sport)
        const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
        filtered = bookings.filter(b => b.sport === tabName);
    }
    filtered.slice(-5).reverse().forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${b.turf}</td>
            <td>${b.name}</td>
            <td>${b.date}</td>
            <td>${b.time}</td>
            <td>₹${b.price || ''}</td>
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

function bookTurfTab(tab, turfId) {
    let turfs = cricketTurfs;
    let sport = 'Cricket';
    if (tab === 'football') { turfs = footballTurfs; sport = 'Football'; }
    if (tab === 'badminton') { turfs = badmintonTurfs; sport = 'Badminton'; }
    const turf = turfs.find(t => t.id === turfId);
    const name = prompt(`Booking "${turf.name}"
Enter your name:`);
    const date = prompt("Enter booking date (YYYY-MM-DD):");
    const time = prompt("Enter booking time (HH:MM):");
    if (name && date && time) {
        const bookings = getBookings();
        bookings.push({ turf: turf.name, name, date, time, sport });
        setBookings(bookings);
        renderBookings(tab);
        alert(`Thank you, ${name}! Your booking for "${turf.name}" on ${date} at ${time} is confirmed.`);
    } else {
        alert("Booking cancelled or incomplete.");
    }
}


// Render all turfs on homepage (all sports), filtered by city if selected
function renderHomepageTurfs() {
    const city = document.getElementById('homepage-city-select') ? document.getElementById('homepage-city-select').value : '';
    const allTurfs = [
        ...cricketTurfs.map(t => ({...t, sport: 'Cricket'})),
        ...footballTurfs.map(t => ({...t, sport: 'Football'})),
        ...badmintonTurfs.map(t => ({...t, sport: 'Badminton'}))
    ];
    let container = document.getElementById('homepage-turf-list');
    if (!container) return;
    container.innerHTML = '';
    // Hide or show the turf section based on city selection
    if (!city) {
        container.style.display = 'none';
        return;
    } else {
        container.style.display = '';
    }
    // Optionally filter by city (if turf.location matches city)
    const filteredTurfs = allTurfs.filter(turf => turf.location === city);
    if (filteredTurfs.length === 0) {
        const msg = document.createElement('div');
        msg.style = 'color:#888;text-align:center;padding:2em;font-size:1.1em;';
        msg.textContent = 'No turfs available for the selected city.';
        container.appendChild(msg);
        return;
    }
    filteredTurfs.forEach(turf => {
        const div = document.createElement('div');
        div.className = 'turf-card';
        div.innerHTML = `
            <h3>${turf.name} <span style="font-size:0.8em;color:#888;">(${turf.sport})</span></h3>
            <p>Location: ${turf.location}</p>
            <p>Price per hour: ₹${turf.price}</p>
            <button onclick="bookTurfHomepage('${turf.sport}',${turf.id})">Book Now</button>
        `;
        container.appendChild(div);
    });
}
// Homepage city select logic
window.onHomepageCityChange = function() {
    const city = document.getElementById('homepage-city-select').value;
    document.getElementById('homepage-selected-city').textContent = city ? `Selected: ${city}` : '';
    renderHomepageTurfs();
}

// Booking from homepage
window.bookTurfHomepage = function(sport, turfId) {
    let turfs = cricketTurfs;
    if (sport === 'Football') turfs = footballTurfs;
    if (sport === 'Badminton') turfs = badmintonTurfs;
    const turf = turfs.find(t => t.id === turfId);
    const name = prompt(`Booking \"${turf.name}\" (${sport})\nEnter your name:`);
    const date = prompt("Enter booking date (YYYY-MM-DD):");
    const time = prompt("Enter booking time (HH:MM):");
    if (name && date && time) {
        const bookings = getBookings();
        bookings.push({ turf: turf.name, name, date, time, sport });
        setBookings(bookings);
        renderBookings(sport.toLowerCase());
        alert(`Thank you, ${name}! Your booking for \"${turf.name}\" (${sport}) on ${date} at ${time} is confirmed.\nCost: ₹${turf.price}`);
    } else {
        alert("Booking cancelled or incomplete.");
    }
}

window.onload = function() {
    renderHomepageTurfs();
    renderTurfs('cricket');
    renderTurfs('football');
    renderTurfs('badminton');
    renderBookings('cricket');
    // If city is preselected, update label
    const city = document.getElementById('homepage-city-select') ? document.getElementById('homepage-city-select').value : '';
    document.getElementById('homepage-selected-city').textContent = city ? `Selected: ${city}` : '';
};

// Tab switching logic (update booking table on tab change)
window.showTab = function(tab) {
    document.getElementById('tab-content-cricket').style.display = tab === 'cricket' ? '' : 'none';
    document.getElementById('tab-content-football').style.display = tab === 'football' ? '' : 'none';
    document.getElementById('tab-content-badminton').style.display = tab === 'badminton' ? '' : 'none';
    document.getElementById('tab-cricket').style.background = tab === 'cricket' ? '#007bff' : '';
    document.getElementById('tab-cricket').style.color = tab === 'cricket' ? '#fff' : '';
    document.getElementById('tab-football').style.background = tab === 'football' ? '#007bff' : '';
    document.getElementById('tab-football').style.color = tab === 'football' ? '#fff' : '';
    document.getElementById('tab-badminton').style.background = tab === 'badminton' ? '#007bff' : '';
    document.getElementById('tab-badminton').style.color = tab === 'badminton' ? '#fff' : '';
    renderBookings(tab);
}
