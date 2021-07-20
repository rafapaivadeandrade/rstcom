const MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDB;
let cachedClient;

if (!uri)
{
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

if (!dbName)
{
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local")
}

export async function connect()
{
  if (cachedClient && cachedDB)
  {
    return { client: cachedClient, db: cachedDB }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = await client.db(dbName)

  cachedClient = client;
  cachedDB = db;

  return { client, db }
}

export default connect;