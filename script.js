document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const overlay = document.getElementById('overlay');
    const popups = {
        flowers: document.getElementById('flowersPopup'),
        letter: document.getElementById('letterPopup'),
        song: document.getElementById('songPopup')
    };
    
    let currentPopupIndex = 0;
    const popupOrder = ['flowers', 'letter', 'song'];
    
    // Main surprise button click
    surpriseBtn.addEventListener('click', function() {
        showNextPopup();
    });
    
    // Function to show the next popup in sequence
    function showNextPopup() {
        if (currentPopupIndex < popupOrder.length) {
            const popupToShow = popupOrder[currentPopupIndex];
            showPopup(popupToShow);
            currentPopupIndex++;
        }
    }
    
    // Function to show a specific popup
    function showPopup(popupName) {
        overlay.classList.add('active');
        popups[popupName].classList.add('active');
        
        // Add entrance animation
        setTimeout(() => {
            popups[popupName].style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
    }
    
    // Function to hide all popups
    function hideAllPopups() {
        overlay.classList.remove('active');
        Object.values(popups).forEach(popup => {
            popup.classList.remove('active');
        });
    }
    
    // Close button event listeners
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const popupType = this.getAttribute('data-popup');
            hidePopup(popupType);
            
            // Show next popup after a delay
            setTimeout(() => {
                showNextPopup();
            }, 500);
        });
    });
    
    // Function to hide specific popup
    function hidePopup(popupName) {
        popups[popupName].classList.remove('active');
        
        // If it's the last popup, hide overlay
        if (currentPopupIndex >= popupOrder.length) {
            setTimeout(() => {
                overlay.classList.remove('active');
                // Reset for replay
                currentPopupIndex = 0;
            }, 300);
        }
    }
    
    // Overlay click to close
    overlay.addEventListener('click', function() {
        hideAllPopups();
        currentPopupIndex = 0;
    });
    
    // Prevent popup content clicks from closing the popup
    Object.values(popups).forEach(popup => {
        popup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Music player functionality
    const playBtn = document.getElementById('playBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');
    
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            // Since we don't have an actual audio file, we'll simulate
            this.innerHTML = '⏸️ Pause';
            this.style.background = 'linear-gradient(135deg, #98fb98 0%, #87ceeb 100%)';
            isPlaying = true;
            
            // You can uncomment this when you add an actual audio file
            // audioPlayer.play();
        } else {
            this.innerHTML = '▶️ Play Our Song';
            this.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
            isPlaying = false;
            
            // audioPlayer.pause();
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        // audioPlayer.volume = volume;
        
        // Visual feedback
        this.style.background = `linear-gradient(to right, #ff9a9e 0%, #ff9a9e ${this.value}%, #ddd ${this.value}%, #ddd 100%)`;
    });
    
    // Initialize volume slider appearance
    volumeSlider.style.background = `linear-gradient(to right, #ff9a9e 0%, #ff9a9e 50%, #ddd 50%, #ddd 100%)`;
    
    // Add some sparkle effects
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '10';
        sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    // Add sparkle animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0px) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create sparkles periodically
    setInterval(createSparkle, 2000);
});
