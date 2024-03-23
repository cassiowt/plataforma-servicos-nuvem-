const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'postcardsDB';
const collectionName = 'postcards';

// Rota GET para obter todos os Postcards
app.get('/postcards', async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const postcards = await collection.find().toArray();
    res.json(postcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read postcards data.' });
  } finally {
    await client.close();
  }
});

// Rota GET para obter um único Postcard pelo ID
app.get('/postcards/:id', async (req, res) => {
  const postId = req.params.id;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const postcard = await collection.findOne({ _id: new ObjectId(postId) });

    if (!postcard) {
      return res.status(404).json({ error: 'Postcard not found.' });
    }

    res.json(postcard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read postcard data.' });
  } finally {
    await client.close();
  }
});

// Rota POST para adicionar um novo Postcard
app.post('/postcards', async (req, res) => {
  const { name, cidade, pais, descricao, imageUrl } = req.body;
  const newPostcard = {
    name,
    cidade,
    pais,
    descricao,
    imageUrl,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(newPostcard);
    newPostcard._id = result.insertedId;
    res.status(201).json(newPostcard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add new postcard.' });
  } finally {
    await client.close();
  }
});

// Restante das rotas (PUT, DELETE) pode ser modificado de maneira semelhante.

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
