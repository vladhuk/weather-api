import { Op } from 'sequelize';
import City from '../models/City';

export async function deleteAllCitiesWithWeather(): Promise<number> {
  return City.destroy({ where: { id: { [Op.gte]: 0 } } });
}
