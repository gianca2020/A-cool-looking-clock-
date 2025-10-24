// Cache DOM elements
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');

function updateClock() {
    const now = new Date();
    
    // Get time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calculate angles for clock hands
    const secondAngle = ((seconds / 60) * 360) + 90;
    const minuteAngle = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourAngle = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30) + 90;
    
    // Apply rotations to clock hands
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    
    // Update digital time
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    timeDisplay.textContent = timeString;
    
    // Update date
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateDisplay.textContent = dateString;
}

// Initialize clock
updateClock();

// Update every second
setInterval(updateClock, 1000);
