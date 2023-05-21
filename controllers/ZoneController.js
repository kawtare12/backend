const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');
const ZoneService = require('../services/ZoneService');
const zoneService = new ZoneService(Zone);

router.get('/', async (req, res) => {
  try {
    const zones = await zoneService.getAllZones();
    res.json(zones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const zone = await zoneService.getZoneById(req.params.id);
    res.json(zone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/city/:cityId', async (req, res) => {
  try {
    const zones = await zoneService.getZonesByCityId(req.params.cityId);
    res.json(zones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/save', async (req, res) => {
  try {
    const zone = await zoneService.createZone(req.body);
    res.json(zone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const zone = await zoneService.updateZone(req.params.id, req.body);
    res.json(zone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await zoneService.deleteZone(req.params.id);
    res.json({ msg: 'Zone deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
