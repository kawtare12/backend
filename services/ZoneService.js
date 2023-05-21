const Zone = require('../models/Zone');

class ZoneService {
  constructor(zoneModel) {
    this.zoneModel = zoneModel;
  }

  // Get all zones
  async getAllZones() {
    try {
      const zones = await this.zoneModel.find();
      return zones;
    } catch (error) {
      throw new Error(`Unable to fetch zones: ${error}`);
    }
  }

  // Get zones by city ID
  async getZonesByCityId(cityId) {
    try {
      const zones = await this.zoneModel.find({ city: cityId });
      return zones;
    } catch (error) {
      throw new Error(`Unable to fetch zones for city ${cityId}: ${error}`);
    }
  }

  // Get a zone by ID
  async getZoneById(id) {
    try {
      const zone = await this.zoneModel.findById(id);
      if (!zone) {
        throw new Error(`Zone not found with ID ${id}`);
      }
      return zone;
    } catch (error) {
      throw new Error(`Unable to fetch zone with ID ${id}: ${error}`);
    }
  }

  // Save a new zone
  async createZone(zone) {
    try {
      const newZone = new Zone(zone);
      const savedZone = await newZone.save();
      return savedZone;
    } catch (error) {
      throw new Error(`Unable to create zone: ${error}`);
    }
  }

  // Update a zone
  async updateZone(id, updatedZone) {
    try {
      const existingZone = await this.zoneModel.findById(id);
      if (!existingZone) {
        throw new Error(`Zone not found with ID ${id}`);
      }
      existingZone.name = updatedZone.name;
      existingZone.city = updatedZone.city;
      const updated = await existingZone.save();
      return updated;
    } catch (error) {
      throw new Error(`Unable to update zone with ID ${id}: ${error}`);
    }
  }

  // Delete a zone by ID
  async deleteZone(id) {
    try {
      const deleted = await this.zoneModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error(`Zone not found with ID ${id}`);
      }
      return deleted;
    } catch (error) {
      throw new Error(`Unable to delete zone with ID ${id}: ${error}`);
    }
  }
}

module.exports = ZoneService;
