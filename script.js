// Initialize and cache DOM elements after DOM is ready
let secondHand, minuteHand, hourHand, timeDisplay, dateDisplay;

function initializeClock() {
    // Cache DOM elements
    secondHand = document.querySelector('.second-hand');
    minuteHand = document.querySelector('.minute-hand');
    hourHand = document.querySelector('.hour-hand');
    timeDisplay = document.getElementById('time');
    dateDisplay = document.getElementById('date');
    
    // Start the clock
    updateClock();
    setInterval(updateClock, 1000);
}

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

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClock);
} else {
    // DOM is already loaded
    initializeClock();
}
