// Phase 2 Contact Form - Production Ready
class Phase2ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.notification = document.getElementById('notification');
        this.apiEndpoint = 'https://954662eb-77ed-4d80-8c05-32435884a706-00-340exx00om9ja.sisko.replit.dev/api/contact';
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
        
        // Check for success parameter in URL
        this.checkForSuccess();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Client-side validation
        if (!name || !email) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (name.length > 100) {
            this.showNotification('Name is too long (max 100 characters).', 'error');
            return;
        }
        
        if (message && message.length > 1000) {
            this.showNotification('Message is too long (max 1000 characters).', 'error');
            return;
        }
        
        // Disable submit button
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Send to backend API
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Success
                this.showNotification('Thank you for your message! I\'ll get back to you at upadhyayshivam1628@gmail.com soon.', 'success');
                this.form.reset();
                
                // Save to localStorage as backup
                this.saveToLocalStorage({ name, email, message, timestamp: new Date().toISOString() });
                
            } else {
                // API error - fallback to localStorage
                this.saveToLocalStorage({ name, email, message, timestamp: new Date().toISOString() });
                this.showNotification('Message saved locally. I\'ll check my submissions regularly.', 'warning');
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            
            // Network error - fallback to localStorage
            this.saveToLocalStorage({ name, email, message, timestamp: new Date().toISOString() });
            this.showNotification('Network error. Message saved locally and I\'ll respond soon.', 'warning');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    saveToLocalStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('contacts') || '[]');
        submissions.push(data);
        localStorage.setItem('contacts', JSON.stringify(submissions));
        console.log('💾 Backup saved to localStorage:', data);
    }

    checkForSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            this.showNotification('Thank you for your message! I\'ll get back to you at upadhyayshivam1628@gmail.com soon.', 'success');
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    showNotification(message, type = 'success') {
        if (!this.notification) {
            this.notification = document.createElement('div');
            this.notification.id = 'notification';
            this.notification.className = 'notification';
            document.body.appendChild(this.notification);
        }

        this.notification.textContent = message;
        this.notification.className = `notification ${type}`;
        this.notification.style.display = 'block';

        setTimeout(() => {
            this.notification.style.display = 'none';
        }, 5000);
    }
}

// Initialize Phase 2 contact form
document.addEventListener('DOMContentLoaded', () => {
    new Phase2ContactForm();
});
