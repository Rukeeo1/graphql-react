const { RESTDataSource } = require('apollo-datasource-rest');

class VehicleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      'https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json';
  }

  async getAllVehicles() {
    const response = await this.get('');

    return Array.isArray(response.data.bikes)
      ? response.data.bikes.map((vehicle) => this.vehicleReducer(vehicle))
      : [];
  }

  async getAllVehicleId({ vehicleId }) {
    const response = await this.get('');

    const vehicleWanted = response.data.bikes.filter((vehicle) =>
      vehicle.bike_id.toLowerCase().includes(vehicleId.toLowerCase())
    );

    return this.vehicleReducer(vehicleWanted);
  }

  async searchVehiclesById({ vehicleId }) {
    const response = await this.get('');
    const vehicleWanted = response.data.bikes.filter((vehicle) =>
      vehicle.bike_id.toLowerCase().includes(vehicleId.toLowerCase())
    );

    return vehicleWanted.map((vehicle) => this.vehicleReducer(vehicle));
  }

  vehicleReducer(vehicle) {
    return {
      bike_id: vehicle.bike_id,
      lat: vehicle.lat,
      lon: vehicle.lon,
      is_reserved: vehicle.is_reserved,
      is_disabled: vehicle.is_disabled,
      vehicle_type: vehicle.vehicle_type,
    };
  }
}

module.exports = VehicleAPI;
