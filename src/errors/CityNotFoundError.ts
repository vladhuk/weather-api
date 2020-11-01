import NotFoundError from './http/NotFoundError';

export default class CityNotFoundError extends NotFoundError {
  constructor(cityId?: number) {
    if (cityId === undefined) {
      super(`City is not found.`);
    } else {
      super(`City with id ${cityId} is not found.`);
    }
  }
}
