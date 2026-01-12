const spinBtn = document.getElementById('spin-btn');
const factDisplay = document.getElementById('fact-display');

// Sound Effects using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function createOscillator(freq, type, duration) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playTickSound() {
    // Mechanical click sound
    createOscillator(200, 'square', 0.05);
}

function playWinSound() {
    // Ding!
    createOscillator(880, 'sine', 1.0); // A5
    setTimeout(() => createOscillator(1100, 'sine', 1.0), 100); // C#6 (Major third approx)
}

// State
let isSpinning = false;
let animationId;
let currentFact = null;

// Temporary phrases to cycle through
const dummyFacts = [
    "Chuck Norris...",
    "Waiting for clearance...",
    "Loading lethal data...",
    "Roundhouse kicking servers...",
    "Staring down the database...",
    "Counting to infinity...",
    "Dividing by zero..."
];

async function fetchFact() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error("Failed to fetch fact:", error);
        return "Chuck Norris broke the internet. Try again.";
    }
}

async function startSpin() {
    if (isSpinning) return;
    
    // Resume context if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }

    isSpinning = true;
    spinBtn.disabled = true;
    factDisplay.classList.add('blur-effect');

    // Start fetching the real fact in the background
    const factPromise = fetchFact();

    // Loop for the visual slot effect
    let counter = 0;
    const spinDuration = 2000; // Minimum spin time
    const startTime = Date.now();

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;

        if (now % 5 === 0) { // Throttling visual updates slightly
             // Randomly show pieces of dummy text or previously fetched facts
             factDisplay.innerText = dummyFacts[Math.floor(Math.random() * dummyFacts.length)];
             // Tick sound
             if (counter % 3 === 0) playTickSound(); 
             counter++;
        }

        if (elapsed < spinDuration) {
            animationId = requestAnimationFrame(animate);
        } else {
            // Spin duration over, wait for fetch
            finishSpin(factPromise);
        }
    }

    animationId = requestAnimationFrame(animate);
}

async function finishSpin(factPromise) {
    const finalFact = await factPromise;
    cancelAnimationFrame(animationId);
    
    factDisplay.innerText = finalFact;
    factDisplay.classList.remove('blur-effect');
    
    playWinSound();
    
    isSpinning = false;
    spinBtn.disabled = false;
}

spinBtn.addEventListener('click', startSpin);
