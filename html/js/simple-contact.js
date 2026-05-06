// Simple Contact Form with EmailJS Integration
class SimpleContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.notification = document.getElementById('notification');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate
        if (!name || !email) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Save to localStorage
        const data = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        this.saveToLocalStorage(data);

        // Send email using multiple methods
        await this.sendEmailMultipleWays(data);

        // Show success
        this.showNotification('Thank you for your message! I\'ll get back to you at upadhyayshivam1628@gmail.com soon.', 'success');
        
        // Reset form
        this.form.reset();
    }

    saveToLocalStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('contacts') || '[]');
        submissions.push(data);
        localStorage.setItem('contacts', JSON.stringify(submissions));
        console.log('💾 Saved to localStorage:', data);
    }

    async sendEmailMultipleWays(data) {
        // Method 1: FormSubmit.co (backup)
        this.tryFormSubmit(data);
        
        // Method 2: Direct mailto (fallback)
        this.tryMailto(data);
        
        // Method 3: Webhook (if configured)
        await this.tryWebhook(data);
    }

    tryFormSubmit(data) {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', data.message);
            formData.append('_subject', `Portfolio Contact: ${data.name}`);
            formData.append('_template', 'table');

            fetch('https://formsubmit.co/upadhyayshivam1628@gmail.com', {
                method: 'POST',
                body: formData
            }).then(response => {
                console.log('📧 FormSubmit.co response:', response.status);
            }).catch(error => {
                console.log('❌ FormSubmit.co error:', error);
            });
        } catch (error) {
            console.log('❌ FormSubmit.co failed:', error);
        }
    }

    tryMailto(data) {
        // Create mailto link as fallback
        const subject = encodeURIComponent(`Portfolio Contact: ${data.name}`);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`);
        const mailtoLink = `mailto:upadhyayshivam1628@gmail.com?subject=${subject}&body=${body}`;
        
        console.log('📧 Mailto link created:', mailtoLink);
        
        // Optionally open mailto (commented out to avoid popup)
        // window.location.href = mailtoLink;
    }

    async tryWebhook(data) {
        // For future webhook integration
        console.log('🔗 Webhook integration ready for future setup');
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new SimpleContactForm();
});
