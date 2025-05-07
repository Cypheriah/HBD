// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById('birthdayForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const recipientName = document.getElementById('recipientName').value;
    const recipientEmail = document.getElementById('recipientEmail').value;
    const message = document.getElementById('message').value;

    // Show loading state
    const sendButton = document.querySelector('.send-btn');
    const originalButtonText = sendButton.innerHTML;
    sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    sendButton.disabled = true;

    // Prepare email template parameters
    const templateParams = {
        to_name: recipientName,
        to_email: recipientEmail,
        message: message
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            // Show success message
            showNotification('Birthday surprise sent successfully! 🎉', 'success');
            // Reset form
            document.getElementById('birthdayForm').reset();
        })
        .catch(function(error) {
            // Show error message
            showNotification('Oops! Something went wrong. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button state
            sendButton.innerHTML = originalButtonText;
            sendButton.disabled = false;
        });
});

// Function to show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Simple function to show the popup
function showLetter() {
    const popup = document.getElementById('letterPopup');
    popup.style.display = 'flex';
    popup.style.opacity = '1';
    createConfetti();
}

// Simple function to hide the popup
function hideLetter() {
    const popup = document.getElementById('letterPopup');
    popup.style.display = 'none';
    popup.style.opacity = '0';
}

// Add click events when the page loads
window.onload = function() {
    // Click on envelope
    document.getElementById('envelope').onclick = showLetter;
    
    // Click on close button
    document.getElementById('closePopup').onclick = hideLetter;
    
    // Click outside the letter
    document.getElementById('letterPopup').onclick = function(e) {
        if (e.target === this) {
            hideLetter();
        }
    };
};

// Confetti animation
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#ff9a9e', '#fad0c4', '#ffd93d', '#4ecdc4', '#ff6b6b'];
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -20 + 'px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style); 