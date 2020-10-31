import { Model, Optional, DataTypes } from 'sequelize/types';
import { sequelize } from '../config';
import City from './City';

interface WeatherAttributes {
  id: number;
  date: Date;
  sunrise: Date;
  sunset: Date;
  description: string;
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  clouds: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
}

type WeatherCreationAttributes = Optional<WeatherAttributes, 'id'>;

class Weather
  extends Model<WeatherAttributes, WeatherCreationAttributes>
  implements WeatherAttributes {
  id!: number;
  date!: Date;
  sunrise!: Date;
  sunset!: Date;
  description!: string;
  temp!: number;
  feelsLike!: number;
  pressure!: number;
  humidity!: number;
  dewPoint!: number;
  clouds!: number;
  windSpeed!: number;
  windDeg!: number;
  windGust!: number;
}

Weather.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    sunrise: DataTypes.DATE,
    sunset: DataTypes.DATE,
    description: DataTypes.STRING,
    temp: DataTypes.FLOAT,
    feelsLike: DataTypes.FLOAT,
    pressure: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    dewPoint: DataTypes.FLOAT,
    clouds: DataTypes.INTEGER,
    windSpeed: DataTypes.FLOAT,
    windDeg: DataTypes.INTEGER,
    windGust: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: 'weather',
  }
);

Weather.belongsTo(City);

export default Weather;
