module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('cities', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      lon: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      requests_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cities');
  },
};
