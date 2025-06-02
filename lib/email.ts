import { Resend } from 'resend';
import ActiveSubscriber from '@/models/ActiveSubscriber';

// Helper function to get Resend instance
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    return new Resend(apiKey);
}

// Helper function to validate email configuration
function validateEmailConfig() {
    const errors = [];
    if (!process.env.RESEND_API_KEY) {
        errors.push('RESEND_API_KEY is missing');
    }
    if (!process.env.EMAIL_FROM) {
        errors.push('EMAIL_FROM is missing');
    } else {
        // Basic email format validation
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        const matches = process.env.EMAIL_FROM.match(/<([^>]+)>/) || [null, process.env.EMAIL_FROM];
        const emailPart = matches[1];
        if (!emailRegex.test(emailPart)) {
            errors.push('EMAIL_FROM format is invalid. Should be "Name <email@domain.com>" or "email@domain.com"');
        }
    }
    return errors;
}

export async function sendWelcomeEmail(email: string) {
    try {
        // Validate configuration
        const configErrors = validateEmailConfig();
        if (configErrors.length > 0) {
            throw new Error(`Email configuration errors: ${configErrors.join(', ')}`);
        }

        console.log('Initializing welcome email send with config:', {
            from: process.env.EMAIL_FROM,
            apiKeyExists: !!process.env.RESEND_API_KEY,
            to: email
        });

        const resend = getResendClient();
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firsthand.akhilhanda.com';
        const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
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
            console.error('Resend API error:', error);
            throw error;
        }

        console.log(`Welcome email sent successfully to ${email}:`, {
            messageId: data?.id,
            from: process.env.EMAIL_FROM,
            to: email
        });
        
        return { success: true };

    } catch (error) {
        console.error('Failed to send welcome email:', {
            error,
            config: {
                from: process.env.EMAIL_FROM,
                apiKeyExists: !!process.env.RESEND_API_KEY,
                to: email
            }
        });
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
        
        // Validate configuration
        const configErrors = validateEmailConfig();
        if (configErrors.length > 0) {
            throw new Error(`Email configuration errors: ${configErrors.join(', ')}`);
        }

        // Initialize Resend client
        const resend = getResendClient();

        // Get site URL with fallback
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.akhilhanda.com';
        
        console.log('Email configuration:', {
            from: process.env.EMAIL_FROM,
            apiKeyExists: !!process.env.RESEND_API_KEY,
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
        let errors = [];
        
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
                    from: process.env.EMAIL_FROM!,
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
                    console.error(`Error sending to ${subscriber.email}:`, error);
                    errors.push({ email: subscriber.email, error });
                    continue;
                }

                console.log(`Email sent successfully to ${subscriber.email}:`, {
                    messageId: data?.id,
                    from: process.env.EMAIL_FROM,
                    to: subscriber.email
                });
                successCount++;
            } catch (emailError) {
                console.error(`Failed to send email to ${subscriber.email}:`, emailError);
                errors.push({ email: subscriber.email, error: emailError });
            }
        }
        
        return { 
            success: true, 
            count: successCount, 
            totalSubscribers: subscribers.length,
            errors: errors.length > 0 ? errors : undefined
        };

    } catch (error) {
        console.error('Failed to send email notification. Full error:', {
            error,
            config: {
                from: process.env.EMAIL_FROM,
                apiKeyExists: !!process.env.RESEND_API_KEY
            }
        });
        throw error;
    }
} 