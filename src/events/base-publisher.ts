/* eslint-disable  */
import { Stan } from 'node-nats-streaming';
import { logger } from '../logger';
interface Event<T> {
  subject: string;
  data: T;
}

export abstract class Publisher {
  abstract publish<T>(event: Event<T>): Promise<void>;
  static newInstance(client: Stan): Publisher {
    return new BasePublisher(client);
  }
}

class BasePublisher extends Publisher {
  private client: Stan;
  constructor(client: Stan) {
    super();
    this.client = client;
  }

  publish<T>(event: Event<T>): Promise<void> {
    const { data, subject } = event;
    return new Promise((resolve, reject) => {
      this.client.publish(subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          logger.info('Event published to subject', subject);
          resolve();
        }
      });
    });
  }
}
