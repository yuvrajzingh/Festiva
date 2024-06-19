 import mongoose from 'mongoose';

 const MONGODB_URI = process.env.MONGODB_URI;

 //we are using a cached db connection pattern as in severless functions and environments where your code could be executed multiple times but not in a single continuous server process you need to manage DB connections effeciently bcos each invokation of a serverless function can result to a new connection to the DB which is ineffecient and exhaust the DB resources. If we are not caching our connection each server actions will create new connection but by caching our connection or the promise of connection all the subsequent invokations could reuse the existing connections if it is still open or just try to create a new one.


 let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDatabase = async() => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'Festiva', 
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn; 
}