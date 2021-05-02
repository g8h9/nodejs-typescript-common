export abstract class UpdateQueryBuilder {
  static newBuilder(updateObject: Record<string, any>): UpdateQueryBuilder {
    return new MongoUpdateQueryBuilder(updateObject);
  }

  abstract build(): any;
}

class MongoUpdateQueryBuilder extends UpdateQueryBuilder {
  updateObject: Record<string, any>;

  constructor(updateObject: Record<string, any>) {
    super();
    this.updateObject = updateObject;
  }

  build(): Record<string, any> {
    const result = Object.entries(this.updateObject)
      .filter(([key, value]) => key !== undefined && value !== undefined)
      .reduce((acc: Record<string, any>, [key, value]) => ({ ...acc, [key]: value }), {});
    // TODO - the auditable object should be configurable
    // TODO - updatedAt should be configurable
    return { ...result, updatedAt: new Date(), $inc: { version: 1 } };
  }
}
