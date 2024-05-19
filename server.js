const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://juniorlk:juniorlk@clusterjamboinfo.5pwdk22.mongodb.net/?retryWrites=true&w=majority&appName=ClusterJamboInfo', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Routes
const studentsRouter = require('./routes/students');
app.use('/students', studentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
