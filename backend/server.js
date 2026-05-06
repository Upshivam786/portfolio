const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['https://upshivam786.github.io', 'http://localhost:8080'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many contact requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/contact', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, trim: true, maxlength: 1000 },
    timestamp: { type: Date, default: Date.now },
    ip: { type: String },
    userAgent: { type: String },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    spamScore: { type: Number, default: 0 }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email server error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Spam detection
function calculateSpamScore(data) {
    let score = 0;
    
    // Check for suspicious patterns
    if (data.message && data.message.toLowerCase().includes('http')) score += 2;
    if (data.message && data.message.toLowerCase().includes('click here')) score += 1;
    if (data.name && data.name.toLowerCase().includes('test')) score += 1;
    if (data.email && data.email.includes('+')) score += 1;
    
    return score;
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validation
        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and email are required' 
            });
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }
        
        // Spam detection
        const spamScore = calculateSpamScore({ name, email, message });
        if (spamScore > 3) {
            return res.status(429).json({ 
                success: false, 
                message: 'Message flagged as spam' 
            });
        }
        
        // Save to database
        const contact = new Contact({
            name,
            email,
            message,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            spamScore
        });
        
        await contact.save();
        
        // Send email notification
        await sendEmailNotification(contact);
        
        // Send auto-reply (optional)
        await sendAutoReply(contact);
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
        
    } catch (error) {
        console.error('❌ Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error, please try again later' 
        });
    }
});

// Send email notification
async function sendEmailNotification(contact) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'upadhyayshivam1628@gmail.com',
            subject: `Portfolio Contact: ${contact.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${contact.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 10px; border-left: 4px solid #3b82f6;">${contact.message || 'No message provided'}</p>
                        <p><strong>Time:</strong> ${contact.timestamp.toLocaleString()}</p>
                        <p><strong>IP:</strong> ${contact.ip}</p>
                    </div>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="mailto:${contact.email}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Reply to ${contact.name}
                        </a>
                    </div>
                    <hr style="margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This message was sent from your portfolio website.<br>
                        Spam Score: ${contact.spamScore}/10
                    </p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent for:', contact.name);
        
    } catch (error) {
        console.error('❌ Email notification failed:', error);
    }
}

// Send auto-reply
async function sendAutoReply(contact) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: contact.email,
            subject: 'Thank you for contacting SHIVAM UPADHYAY',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">Thank You for Your Message!</h2>
                    <p>Dear ${contact.name},</p>
                    <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Your Message:</h3>
                        <p style="background: white; padding: 10px; border-left: 4px solid #3b82f6;">${contact.message || 'No message provided'}</p>
                    </div>
                    <p>Best regards,<br><strong>SHIVAM UPADHYAY</strong></p>
                    <hr style="margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        Portfolio: <a href="https://upshivam786.github.io/portfolio">https://upshivam786.github.io/portfolio</a><br>
                        LinkedIn: <a href="https://linkedin.com/in/su021">https://linkedin.com/in/su021</a><br>
                        GitHub: <a href="https://github.com/Upshivam786">https://github.com/Upshivam786</a>
                    </p>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Auto-reply sent to:', contact.email);
        
    } catch (error) {
        console.error('❌ Auto-reply failed:', error);
    }
}

// Admin endpoints
app.get('/api/admin/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ timestamp: -1 });
        res.json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.put('/api/admin/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.delete('/api/admin/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend running on port ${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
    console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

module.exports = app;
