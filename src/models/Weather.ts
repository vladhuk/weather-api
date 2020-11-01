import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import City from './City';

export interface WeatherAttributes {
  id: number;
  date: Date;
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  clouds: number;
  windSpeed: number;
  windDeg: number;

  cityId: number;
}

export type WeatherCreationAttributes = Optional<WeatherAttributes, 'id'>;

class Weather
  extends Model<WeatherAttributes, WeatherCreationAttributes>
  implements WeatherAttributes {
  id!: number;
  date!: Date;
  temp!: number;
  feelsLike!: number;
  pressure!: number;
  humidity!: number;
  dewPoint!: number;
  clouds!: number;
  windSpeed!: number;
  windDeg!: number;

  cityId!: number;
}

Weather.init(
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
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'weather',
  }
);

Weather.belongsTo(City, { onDelete: 'cascade' });
City.hasMany(Weather);

export default Weather;
