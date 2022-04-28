import express from 'express';

require('dotenv').config({path: '../config/.env'});
const PORT = process.env.PORT || 2000;

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  })