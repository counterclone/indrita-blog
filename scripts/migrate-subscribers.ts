import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables
config();

// Define old schema
const oldSubscriberSchema = new mongoose.Schema({
    email: String,
    subscribed: Boolean,
    subscribedAt: Date
});

// Define new schemas
const activeSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const unsubscribedUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    unsubscribedAt: {
        type: Date,
        default: Date.now
    },
    previousSubscriptionDate: {
        type: Date,
        required: true
    }
});

async function migrateSubscribers() {
    try {
        // Connect to MongoDB
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get old models
        const OldSubscriber = mongoose.model('Subscriber', oldSubscriberSchema);
        
        // Get new models
        const ActiveSubscriber = mongoose.model('ActiveSubscriber', activeSubscriberSchema);
        const UnsubscribedUser = mongoose.model('UnsubscribedUser', unsubscribedUserSchema);

        // Get all subscribers from old collection
        const oldSubscribers = await OldSubscriber.find();
        console.log(`Found ${oldSubscribers.length} total subscribers to migrate`);

        // Counters for statistics
        let activeCount = 0;
        let unsubscribedCount = 0;
        let errorCount = 0;

        // Process each subscriber
        for (const subscriber of oldSubscribers) {
            try {
                if (subscriber.subscribed) {
                    // Add to active subscribers
                    await ActiveSubscriber.create({
                        email: subscriber.email,
                        subscribedAt: subscriber.subscribedAt
                    });
                    activeCount++;
                } else {
                    // Add to unsubscribed users
                    await UnsubscribedUser.create({
                        email: subscriber.email,
                        previousSubscriptionDate: subscriber.subscribedAt,
                        unsubscribedAt: new Date() // We don't have the exact unsubscribe date
                    });
                    unsubscribedCount++;
                }
            } catch (error) {
                console.error(`Error migrating subscriber ${subscriber.email}:`, error);
                errorCount++;
            }
        }

        // Print statistics
        console.log('\nMigration completed:');
        console.log(`- Active subscribers migrated: ${activeCount}`);
        console.log(`- Unsubscribed users migrated: ${unsubscribedCount}`);
        console.log(`- Errors encountered: ${errorCount}`);

        // Optionally, rename old collection as backup
        if (errorCount === 0) {
            const db = mongoose.connection.db;
            if (!db) {
                throw new Error('Database connection not established');
            }
            await db.collection('subscribers').rename('subscribers_backup');
            console.log('\nOld collection renamed to subscribers_backup');
        }

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run migration
migrateSubscribers(); 