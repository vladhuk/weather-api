import { Op, WhereOptions } from 'sequelize';
import Weather, { WeatherAttributes } from '../models/Weather';

enum Day {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
}

export async function getWeather(
  cityId?: number,
  date?: string | Day
): Promise<Weather[]> {
  const whereOptions: WhereOptions<WeatherAttributes> = {};

  if (cityId) {
    whereOptions.cityId = cityId;
  }

  if (date) {
    let correctDate: Date;

    if (date === Day.TODAY) {
      correctDate = today();
    } else if (date === Day.YESTERDAY) {
      correctDate = yesterday();
    } else {
      correctDate = secondsToDate(Number.parseInt(date));
    }

    whereOptions.date = { [Op.between]: getDayRange(correctDate) };
  }

  return Weather.findAll({ where: whereOptions });
}

function today() {
  return new Date();
}

function yesterday() {
  return new Date(new Date().setUTCHours(-24));
}

function getDayRange(date: Date): string[] {
  return [
    new Date(new Date(date).setUTCHours(0, 0, 0, 0)),
    new Date(new Date(date).setUTCHours(24, 0, 0, -1)),
  ].map((date) => date.toString());
}

function secondsToDate(seconds: number): Date {
  return new Date(seconds * 1000);
}
