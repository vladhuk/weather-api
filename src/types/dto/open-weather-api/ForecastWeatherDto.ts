import OneCallApiWeatherDto from './OneCallApiWeatherDto';

interface DailyWeather
  extends Omit<OneCallApiWeatherDto, 'temp' | 'feels_like'> {
  temp: {
    day: number;
  };
  feels_like: {
    day: number;
  };
}

export default interface ForecastWeatherDto {
  daily: DailyWeather[];
}
