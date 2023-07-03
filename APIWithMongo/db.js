/* const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/'
const dbName = 'beauty-saloon'

const connectDB = async () => {
  console.log('Tentando conectar com o banco de dados')

  try {
    const client = new MongoClient(url)
    await client.connect()

    const databaseList = await client.db().admin().listDatabases()
    const dbExists = databaseList.databases.some(db => db.name === dbName)
    let db;

    if(dbExists){
      db = client.db(dbName);
      console.log(`Conectado ao banco de dados '${dbName}'`);
    }
    else{
      db = await client.db().admin().createDatabase(dbName);
      console.log(`Banco '${dbName}' criada com sucesso`);
    }

    console.log('Conexão com o banco de dados estabelecida');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
    process.exit(1); // Encerrar o aplicativo em caso de falha na conexão
  }
};

module.exports = connectDB; */

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'
const dbName = 'project'

const connectDB = async () => {
  console.log('Tentando conectar com o banco de dados');
  try {
    const client = new MongoClient(url)
    await client.connect()

    const databaseList = await client.db().admin().listDatabases()
    const dbExists = databaseList.databases.some(db => db.name === dbName)

    let db;
    if (dbExists) {
      db = client.db(dbName);
      await mongoose.connect(`mongodb://localhost/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexão com o banco de dados estabelecida');
    }
    else {
      db = client.db(dbName);
      await db.createCollection('exampleCollection');
      await mongoose.connect(`mongodb://localhost/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Database '${dbName}' criada com sucesso`);
    }

  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
    process.exit(1); // Encerrar o aplicativo em caso de falha na conexão
  }
};

module.exports = connectDB;
