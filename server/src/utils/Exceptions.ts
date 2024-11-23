import { Response } from 'express';

import displayMessage from './display';

enum HTTPStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

class HTTPException extends Error {
  private statusCode: HTTPStatus;
  private error: string;
  private timestamp: string;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.error = HTTPStatus[statusCode];
    this.timestamp = new Date().toISOString();
  }

  private log(): void {
    console.error(displayMessage(`${this.statusCode}: ${this.message}`, '*'));
  }

  public send(res: Response): void {
    this.log();

    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      timestamp: this.timestamp,
    });
  }
}

// Implementing the Singleton pattern to have a single instance of the Exceptions class
class Exceptions {
  private constructor() {}
  private static instance: Exceptions;
  public static getInstance(): Exceptions {
    if (!Exceptions.instance) this.instance = new Exceptions();

    return this.instance;
  }

  public badRequest(res: Response, message: string): void {
    const httpException = new HTTPException(HTTPStatus.BAD_REQUEST, message);

    httpException.send(res);
  }

  public unauthorized(res: Response, message: string): void {
    const httpException = new HTTPException(HTTPStatus.UNAUTHORIZED, message);

    httpException.send(res);
  }

  public forbidden(res: Response, message: string): void {
    const httpException = new HTTPException(HTTPStatus.FORBIDDEN, message);

    httpException.send(res);
  }

  public notFound(res: Response, message: string): void {
    const httpException = new HTTPException(HTTPStatus.NOT_FOUND, message);

    httpException.send(res);
  }

  public conflict(res: Response, message: string): void {
    const httpException = new HTTPException(HTTPStatus.CONFLICT, message);

    httpException.send(res);
  }

  public internal(res: Response, message: string, err: unknown): void {
    const httpException = new HTTPException(
      HTTPStatus.INTERNAL_SERVER_ERROR,
      message
    );

    httpException.send(res);
    console.error(err); // we need to log the actual error for the internal server errors
  }
}

export default Exceptions.getInstance();
