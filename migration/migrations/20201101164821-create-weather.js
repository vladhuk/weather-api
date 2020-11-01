module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      'weather',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: DataTypes.DATE,
        temp: DataTypes.FLOAT,
        feelsLike: DataTypes.FLOAT,
        pressure: DataTypes.INTEGER,
        humidity: DataTypes.INTEGER,
        dewPoint: DataTypes.FLOAT,
        clouds: DataTypes.INTEGER,
        windSpeed: DataTypes.FLOAT,
        windDeg: DataTypes.INTEGER,
        cityId: {
          type: DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'cities',
            },
            key: 'id',
          },
          allowNull: false,
        },
      },
      {
        underscore: true,
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('weather');
  },
};
