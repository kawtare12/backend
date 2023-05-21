const City = require('../models/City');

class CityService {
  constructor(cityModel) {
    this.cityModel = cityModel;
  }

  // Get all cities
  async getAllCities() {
    try {
      const cities = await this.cityModel.find();
      return cities;
    } catch (error) {
      throw new Error(`Unable to fetch cities: ${error}`);
    }
  }

  // Get a city by ID
  async getCityById(id) {
    try {
      const city = await this.cityModel.findById(id);
      return city;
    } catch (error) {
      throw new Error(`Unable to fetch city with ID ${id}: ${error}`);
    }
  }

  // Save a new city
  async saveCity(city) {
    try {
      const newCity = new this.cityModel(city);
      const savedCity = await newCity.save();
      return savedCity;
    } catch (error) {
      throw new Error(`Unable to save city: ${error}`);
    }
  }

  // Update a city
  async updateCity(id, updatedCity) {
    try {
      const existingCity = await this.cityModel.findById(id);
      if (!existingCity) {
        return null;
      }
      existingCity.name = updatedCity.name;
      const updated = await existingCity.save();
      return updated;
    } catch (error) {
      throw new Error(`Unable to update city with ID ${id}: ${error}`);
    }
  }

  // Delete a city by ID
  async deleteCity(id) {
    try {
      const deleted = await this.cityModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw new Error(`Unable to delete city with ID ${id}: ${error}`);
    }
  }
}

module.exports = CityService;
