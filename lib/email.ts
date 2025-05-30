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

export async function sendWelcomeEmail(email: string) {
    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firsthand.akhilhanda.com';
        const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our Newsletter!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to Our Newsletter!</h2>
                    <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
                    <p>You'll receive updates about:</p>
                    <ul>
                        <li>New articles and insights</li>
                        <li>Digital banking evolution</li>
                        <li>Fintech innovations</li>
                        <li>Latest industry trends</li>
                    </ul>
                    <p>Stay tuned for our upcoming content!</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">
                        You're receiving this because you subscribed to our newsletter. 
                        <a href="${unsubscribeUrl}">Unsubscribe</a>
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}: ${info.messageId}`);
        return { success: true };

    } catch (error) {
        console.error('Failed to send welcome email:', error);
        throw error;
    }
}

export async function sendNewArticleNotification(articleTitle: string, articleExcerpt: string, articleUrl: string) {
    try {
        // Get all active subscribers
        const subscribers = await Subscriber.find({ subscribed: true });
        
        if (subscribers.length === 0) {
            console.log('No subscribers to notify');
            return;
        }
        
        console.log(`Sending notification to ${subscribers.length} subscribers`);
        
        // Send individual emails to each subscriber
        for (const subscriber of subscribers) {
            // Create personalized unsubscribe link
            const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
            
            // Email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: subscriber.email,
                subject: `New Article: ${articleTitle}`,
                html: `
                    <h2>${articleTitle}</h2>
                    <p>${articleExcerpt}</p>
                    <p>Read the full article: <a href="${articleUrl}">${articleUrl}</a></p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">
                        You're receiving this because you subscribed to article updates. 
                        <a href="${unsubscribeUrl}">Unsubscribe</a>
                    </p>
                `
            };

            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${subscriber.email}: ${info.messageId}`);
        }
        
        return { success: true, count: subscribers.length };

    } catch (error) {
        console.error('Failed to send email notification:', error);
        throw error;
    }
} 