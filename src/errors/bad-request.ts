import { ApplicationError } from './application-error';

interface ErrorDetail {
  path: (string | number)[];
  type: string;
  context: { [key: string]: any; key?: string; label?: string; value?: any };
}
export class BadRequest extends ApplicationError {
  details: ErrorDetail[];
  constructor(
    message?: string,
    details: {
      path: (string | number)[];
      type: string;
      context: { [key: string]: any; key?: string; label?: string; value?: any };
    }[] = [],
  ) {
    super(message || 'Bad request', 400);
    this.details = details;
  }
}
