const express = require('express');
const router = express.Router();

const City = require('../models/City');
const CityService = require('../services/CityService');
const cityService = new CityService(City);


// GET all cities
router.get('/', async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.json(cities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a city by id
router.get('/:id', async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.json(city);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.status(500).send('Server Error');
  }
});

// POST a new city
router.post('/', async (req, res) => {
  try {
    const city = new City(req.body);
    await cityService.saveCity(city);
    res.json(city);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update a city by id
router.put('/:id', async (req, res) => {
  try {
    let city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    city.name = req.body.name;
    await cityService.saveCity(city);
    res.json(city);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE a city by id
router.delete('/:id', async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    await cityService.deleteCity(req.params.id);
    res.json({ msg: 'City removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
