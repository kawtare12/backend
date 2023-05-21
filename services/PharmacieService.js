const Pharmacie = require('../models/Pharmacie');

class PharmacieService {
  constructor(pharmacyModel) {
    this.pharmacyModel = pharmacyModel;
  }

  // Get all pharmacies
  async getAllPharmacies() {
    try {
      const pharmacies = await this.pharmacyModel.find();
      return pharmacies;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacies: ${error}`);
    }
  }

  // Get a pharmacy by ID
  async getPharmacyById(id) {
    try {
      const pharmacy = await this.pharmacyModel.findById(id);
      return pharmacy;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacy with ID ${id}: ${error}`);
    }
  }

  // Save a new pharmacy
  async savePharmacy(pharmacy) {
    try {
      const newPharmacy = new this.pharmacyModel(pharmacy);
      const savedPharmacy = await newPharmacy.save();
      return savedPharmacy;
    } catch (error) {
      throw new Error(`Unable to save pharmacy: ${error}`);
    }
  }

  // Update a pharmacy
  async updatePharmacy(id, updatedPharmacy) {
    try {
      const existingPharmacy = await this.pharmacyModel.findById(id);
      if (!existingPharmacy) {
        return null;
      }
      existingPharmacy.name = updatedPharmacy.name;
      existingPharmacy.address = updatedPharmacy.address;
      existingPharmacy.latitude = updatedPharmacy.latitude;
      existingPharmacy.longitude = updatedPharmacy.longitude;
      existingPharmacy.zone = updatedPharmacy.zone;
      existingPharmacy.garde = updatedPharmacy.garde;
      const updated = await existingPharmacy.save();
      return updated;
    } catch (error) {
      throw new Error(`Unable to update pharmacy with ID ${id}: ${error}`);
    }
  }

  // Delete a pharmacy by ID
  async deletePharmacy(id) {
    try {
      const deleted = await this.pharmacyModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw new Error(`Unable to delete pharmacy with ID ${id}: ${error}`);
    }
  }
}

module.exports = PharmacieService;