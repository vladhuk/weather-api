import { WeatherCreationAttributes } from '../models/Weather';
import OneCallApiWeatherDto from '../types/dto/open-weather-api/OneCallApiWeatherDto';

export function mapOneCallApiWeatherDtoToWeatherCreationAttributes(
  weather: OneCallApiWeatherDto,
  cityId: number
): WeatherCreationAttributes {
  return {
    date: new Date(weather.dt * 1000),
    temp: weather.temp,
    feelsLike: weather.feels_like,
    pressure: weather.pressure,
    humidity: weather.humidity,
    dewPoint: weather.dew_point,
    clouds: weather.clouds,
    windSpeed: weather.wind_speed,
    windDeg: weather.wind_deg,
    cityId,
  };
}
