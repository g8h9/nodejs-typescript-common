import ApplicationError from './application-error';

export default class NotAuthorized extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Not authorized', 401);
  }
}
