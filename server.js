const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://Dinujan13:3V5TbUGVHM3WDFCt@cluster0.xfan2.mongodb.net/Chatapp?retryWrites=true&w=majority&appName=Cluster0'; // Updated to use Dinujan database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a schema and model
const messageSchema = new mongoose.Schema({
    name: String,
    age: Number
}, { collection: 'chat' }); // Specify the collection name
const Message = mongoose.model('Message', messageSchema);

// API Endpoints
app.post('/users', async (req, res) => {
    const { name, age } = req.body;
    const newMessage = new Message({ name, age });
    await newMessage.save();
    res.status(201).send(newMessage);
});

app.get('/users', async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
