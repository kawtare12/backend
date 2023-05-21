const express = require('express');
const router = express.Router();

const Pharmacie = require('../models/Pharmacie');
const PharmacieService = require('../services/PharmacieService');
const pharmacieService = new PharmacieService(Pharmacie);

// GET all pharmacies
router.get('/', async (req, res) => {
    try {
        const pharmacies = await pharmacieService.getAllPharmacies();
        res.json(pharmacies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a pharmacy by id
router.get('/:id', async (req, res) => {
    try {
        const pharmacy = await pharmacieService.getPharmacyById(req.params.id);
        if (!pharmacy) {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        res.json(pharmacy);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        res.status(500).send('Server Error');
    }
});

// POST a new pharmacy
router.post('/', async (req, res) => {
    try {
        const pharmacy = new Pharmacie(req.body);
        await pharmacieService.savePharmacy(pharmacy);
        res.json(pharmacy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT update a pharmacy by id
router.put('/:id', async (req, res) => {
    try {
        let pharmacy = await pharmacyService.getPharmacyById(req.params.id);
        if (!pharmacy) {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        pharmacy.name = req.body.name;
        pharmacy.address = req.body.address;
        pharmacy.latitude = req.body.latitude;
        pharmacy.longitude = req.body.longitude;
        pharmacy.zone = req.body.zone;
        pharmacy.garde = req.body.garde;
        await pharmacyService.savePharmacy(pharmacy);
        res.json(pharmacy);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        res.status(500).send('Server Error');
    }
});

// DELETE a pharmacy by id
router.delete('/:id', async (req, res) => {
    try {
        const pharmacy = await pharmacyService.getPharmacyById(req.params.id);
        if (!pharmacy) {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        await pharmacyService.deletePharmacy(req.params.id);
        res.json({ msg: 'Pharmacy removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pharmacy not found' });
        }
        res.status(500).send('Server Error');
    }
});


// get pharmacy by city and zone and garde
router.get('/:garde/:zone/:city', async (req, res) => {
    const garde = req.params.garde;
    const zone = req.params.zone;
    const city = req.params.city;
    console.log(garde,zone,city)

    try {
        const pharmacies = await Pharmacie.find({ garde: garde, zone: zone })
            .populate({
                path: 'zone',
                match: { city: city }
            })
            .exec();
        console.log(pharmacies)

        const filteredPharmacies = pharmacies.filter((pharmacy) => {
            return pharmacy.zone !== null;
        });

        res.json(filteredPharmacies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;