import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tusharkaushik879:W0H1OhM0YcSQ2iMC@cluster0.v3dl6ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('work_upload');
  }
  return db;
};

const getDB = () => {
  if (!db) {
    throw new Error('Must connect to MongoDB before calling this function');
  }
  return db;
};

export { connectDB, getDB };

