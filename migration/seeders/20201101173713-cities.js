module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cities', [
      {
        id: 4046704,
        name: 'Fort Hunt',
        country: 'US',
        lon: -77.058,
        lat: 38.7329,
        requests_number: 5,
      },
      {
        id: 4048023,
        name: 'Bessemer',
        country: 'US',
        lon: -86.9544,
        lat: 33.4018,
        requests_number: 0,
      },
      {
        id: 4048662,
        name: 'Paducah',
        country: 'US',
        lon: -88.6001,
        lat: 37.0834,
        requests_number: 0,
      },
      {
        id: 4049979,
        name: 'Birmingham',
        country: 'US',
        lon: -86.8025,
        lat: 33.5207,
        requests_number: 0,
      },
      {
        id: 4054378,
        name: 'Center Point',
        country: 'US',
        lon: -86.6836,
        lat: 33.6457,
        requests_number: 0,
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('cities', null, {});
  },
};
