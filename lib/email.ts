import nodemailer from 'nodemailer';
import Subscriber from '@/models/Subscriber';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendNewArticleNotification(articleTitle: string, articleExcerpt: string, articleUrl: string) {
    try {
        // Get all active subscribers
        const subscribers = await Subscriber.find({ subscribed: true });
        const subscriberEmails = subscribers.map(sub => sub.email);

        if (subscriberEmails.length === 0) {
            console.log('No subscribers to notify');
            return;
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            bcc: subscriberEmails, // Use BCC for privacy
            subject: `New Article: ${articleTitle}`,
            html: `
                <h2>${articleTitle}</h2>
                <p>${articleExcerpt}</p>
                <p>Read the full article: <a href="${articleUrl}">${articleUrl}</a></p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                    You're receiving this because you subscribed to article updates. 
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe">Unsubscribe</a>
                </p>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email notification sent:', info.messageId);
        return info;

    } catch (error) {
        console.error('Failed to send email notification:', error);
        throw error;
    }
} 