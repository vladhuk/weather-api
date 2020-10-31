import CoordDto from '../CoordDto';
import NumberLong from './NumberLongDto';

export default interface HistoryCityDto {
  city: {
    id: number | NumberLong;
    name: string;
    country: string;
    coord: CoordDto;
  };
}
