const express = require('express');
const mongoose = require('mongoose'); // Importer le module mongoose

const app = express();
const cors=require('cors');
const cityController = require('./controllers/CityController');
const zoneController = require('./controllers/ZoneController');
const pharmacieController = require('./controllers/PharmacieController');

mongoose.connect('mongodb+srv://kaoutarelazizi0607:kawtar123@cluster0.jysmckh.mongodb.net/location', { // Configurer la connexion à la base de données
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/api/cities', cityController);
app.use('/api/zones', zoneController);
app.use('/api/pharmacies', pharmacieController);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});

