import { Resend } from 'resend';
import ActiveSubscriber from '@/models/ActiveSubscriber';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firsthand.akhilhanda.com';
        const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Akhil Handa <newsletter@akhilhanda.com>',
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
        });

        if (error) {
            throw error;
        }

        console.log(`Welcome email sent to ${email}: ${data?.id}`);
        return { success: true };

    } catch (error) {
        console.error('Failed to send welcome email:', error);
        throw error;
    }
}

export async function sendNewArticleNotification(
    articleTitle: string, 
    articleExcerpt: string, 
    articleUrl: string,
    specificRecipients?: string[]
) {
    try {
        console.log('Starting email notification process...');
        
        // Check email configuration
        if (!process.env.RESEND_API_KEY) {
            throw new Error('Email configuration is missing. Please set RESEND_API_KEY.');
        }

        // Get site URL with fallback
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.akhilhanda.com';
        
        console.log('Email configuration:', {
            resendApiKey: 'Set',
            siteUrl: siteUrl
        });

        let subscribers;
        if (specificRecipients) {
            // Use provided recipients list
            subscribers = specificRecipients.map(email => ({ email }));
            console.log(`Using ${subscribers.length} specific recipients`);
        } else {
            // Get all active subscribers
            subscribers = await ActiveSubscriber.find();
            console.log(`Found ${subscribers.length} active subscribers`);
        }
        
        if (subscribers.length === 0) {
            console.log('No subscribers to notify');
            return { success: true, count: 0 };
        }
        
        console.log(`Sending notification to ${subscribers.length} subscribers`);
        let successCount = 0;
        
        // Send individual emails to each subscriber
        for (const subscriber of subscribers) {
            console.log(`Processing email for subscriber: ${subscriber.email}`);
            
            // Create personalized unsubscribe link
            const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
            
            // Create hardcoded article URL
            const hardcodedArticleUrl = `https://www.akhilhanda.com/article-content/${articleUrl.split('/').pop()}`;
            console.log('Article URL:', hardcodedArticleUrl);
            
            try {
                // Send email
                console.log('Attempting to send email to:', subscriber.email);
                const { data, error } = await resend.emails.send({
                    from: process.env.EMAIL_FROM || 'Akhil Handa <newsletter@akhilhanda.com>',
                    to: subscriber.email,
                    subject: `New Article: ${articleTitle}`,
                    html: `
                        <h2>${articleTitle}</h2>
                        <p>${articleExcerpt}</p>
                        <p>Read the full article: <a href="${hardcodedArticleUrl}">${hardcodedArticleUrl}</a></p>
                        <hr>
                        <p style="font-size: 12px; color: #666;">
                            You're receiving this because you subscribed to article updates. 
                            <a href="${unsubscribeUrl}">Unsubscribe</a>
                        </p>
                    `
                });

                if (error) {
                    throw error;
                }

                console.log(`Email sent successfully to ${subscriber.email}: ${data?.id}`);
                successCount++;
            } catch (emailError) {
                console.error(`Failed to send email to ${subscriber.email}:`, emailError);
                // Continue with next subscriber even if one fails
            }
        }
        
        return { success: true, count: successCount, totalSubscribers: subscribers.length };

    } catch (error) {
        console.error('Failed to send email notification. Full error:', error);
        throw error;
    }
} 