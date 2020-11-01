import { Response } from 'express';
import HttpStatus from 'http-status-codes';
import HttpError from '../errors/http/HttpError';

export function httpErrorHandler(err: Error, res: Response): Response | void {
  if (err instanceof HttpError) {
    return res.status(err.getHttpStatusCode()).send(err.message);
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
}
