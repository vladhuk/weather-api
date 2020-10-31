import { Model, Optional, DataTypes } from 'sequelize/types';
import { sequelize } from '../config';
import Weather from './Weather';

interface CityAttributes {
  id: number;
  name: string;
  country: string;
  lon: number;
  lat: number;
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>;

class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes {
  id!: number;
  name!: string;
  country!: string;
  lon!: number;
  lat!: number;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    lon: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: 'city',
  }
);

City.hasMany(Weather);

export default City;
