/* eslint-disable  */
import { StringRegexOptions } from 'joi';
import { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { logger } from '../logger';

interface Handler {
  subject: string;
  queueGroupName: string;
  onMessage: <T>(data: T, msg: Message) => void;
}
export abstract class Listener {
  abstract listen<T>(handler: Handler): void;
  protected ackWait = 5000;
  static newInstance(client: Stan): Listener {
    return new BaseListener(client);
  }
}

class BaseListener extends Listener {
  private client: Stan;
  constructor(client: Stan) {
    super();
    this.client = client;
  }

  subscriptionOptions = (queueGroupName: string) =>
    this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(queueGroupName);

  listen<T>({ subject, queueGroupName, onMessage }: Handler): void {
    const subscription = this.client.subscribe(subject, queueGroupName, this.subscriptionOptions(queueGroupName));

    subscription.on('message', (msg: Message) => {
      logger.info(`Message received: ${subject} / ${queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      onMessage(parsedData, msg);
    });
  }

  private parseMessage(msg: Message) {
    return JSON.parse(msg.getData().toString('utf8'));
  }
}
