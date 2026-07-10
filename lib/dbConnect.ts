// lib/dbConnect.ts
import mongoose from 'mongoose';

function getMongoUri() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }
    return uri;
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function fixUserIndexes(conn: typeof mongoose) {
    try {
        const col = conn.connection.collection('users');
        const indexes = await col.indexes();
        const emailIdx = indexes.find((i) => i.name === 'email_1');
        if (emailIdx && !emailIdx.sparse) {
            await col.dropIndex('email_1');
            await col.createIndex({ email: 1 }, { unique: true, sparse: true, background: true });
        }
    } catch {
        // non-critical – ignore if collection doesn't exist yet
    }
}

async function dbConnect() {
    const MONGODB_URI = getMongoUri();
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (m) => {
            await fixUserIndexes(m);
            return m;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;