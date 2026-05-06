// Enhanced Contact Form with Multiple Storage Options
class EnhancedContactForm {
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
        
        // Get form data directly
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const data = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Validate required fields
        if (!name || !email) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Save to localStorage (current method)
        this.saveToLocalStorage(data);
        
        // Send email notification first
        await this.sendEmailNotification(data);
        
        // Show success message
        this.showNotification('Thank you for your message! I\'ll get back to you at upadhyayshivam1628@gmail.com soon.', 'success');
        
        // Reset form
        this.form.reset();
    }

    saveToLocalStorage(data) {
        const submissions = JSON.parse(localStorage.getItem('contacts') || '[]');
        submissions.push(data);
        localStorage.setItem('contacts', JSON.stringify(submissions));
    }

    async sendEmailNotification(data) {
        // Method 1: FormSubmit.co (Free)
        try {
            console.log('📧 Sending email notification with data:', data);
            
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', data.message || 'Contact request from portfolio');
            formData.append('_subject', `Portfolio Contact: ${data.name}`);
            formData.append('_template', 'table');
            formData.append('_captcha', 'false');

            console.log('📤 FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(`  ${key}: ${value}`);
            }

            const response = await fetch('https://formsubmit.co/upadhyayshivam1628@gmail.com', {
                method: 'POST',
                body: formData
            });
            
            console.log('📨 Response status:', response.status);
            
            if (response.ok) {
                console.log('✅ Email notification sent successfully');
                this.showNotification('Message sent successfully! You will receive an email confirmation.', 'success');
            } else {
                console.log('❌ Email notification failed with status:', response.status);
                this.showNotification('Message saved locally. Email notification failed.', 'warning');
            }
        } catch (error) {
            console.log('❌ Email notification error:', error);
            this.showNotification('Message saved locally. Email notification failed.', 'warning');
        }
    }

    showNotification(message, type = 'success') {
        if (!this.notification) {
            // Create notification element if it doesn't exist
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

// Initialize enhanced contact form
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedContactForm();
});

// Contact Data Viewer Enhancement
class ContactDataManager {
    static getSubmissions() {
        return JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    static exportToJSON() {
        const submissions = this.getSubmissions();
        const dataStr = JSON.stringify(submissions, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `contact_submissions_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    static clearAllSubmissions() {
        if (confirm('Are you sure you want to delete all contact submissions?')) {
            localStorage.removeItem('contacts');
            location.reload();
        }
    }

    static importSubmissions(jsonData) {
        try {
            const submissions = JSON.parse(jsonData);
            const existing = this.getSubmissions();
            const merged = [...existing, ...submissions];
            localStorage.setItem('contacts', JSON.stringify(merged));
            alert(`Imported ${submissions.length} submissions successfully!`);
            location.reload();
        } catch (error) {
            alert('Invalid JSON data. Please check the file format.');
        }
    }
}

// Add to global scope for access from contact data viewer
window.ContactDataManager = ContactDataManager;
