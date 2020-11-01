module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('weather', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: DataTypes.DATE,
      temp: DataTypes.FLOAT,
      feels_like: DataTypes.FLOAT,
      pressure: DataTypes.INTEGER,
      humidity: DataTypes.INTEGER,
      dew_point: DataTypes.FLOAT,
      clouds: DataTypes.INTEGER,
      wind_speed: DataTypes.FLOAT,
      wind_deg: DataTypes.INTEGER,
      city_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'cities',
          },
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('weather');
  },
};
