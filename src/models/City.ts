import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../config';

interface CityAttributes {
  id: number;
  name: string;
  country: string;
  lon: number;
  lat: number;
  requestsNumber: number;
}

type CityCreationAttributes = Optional<CityAttributes, 'id' | 'requestsNumber'>;

class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes {
  id!: number;
  name!: string;
  country!: string;
  lon!: number;
  lat!: number;
  requestsNumber!: number;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    lon: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    requestsNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'city',
  }
);

export default City;
