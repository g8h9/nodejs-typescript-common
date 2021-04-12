import { Filter } from "./filter";

export abstract class QueryBuilder {
  static newBuilder(filter: Record<string, Filter<any>[]>): QueryBuilder {
    return new MongoQueryBuilder(filter);
  }

  abstract build(): any;
}

class MongoQueryBuilder extends QueryBuilder {
  filter: Record<string, Filter<any>[]>;

  constructor(filter: Record<string, Filter<any>[]>) {
    super();
    this.filter = filter;
  }

  build(): Record<string, any> {
    return (Object.keys(this.filter) as string[]).reduce(
      (acc: Record<string, any>, crr: string) => ({
        ...acc,
        [crr]: this.filter[crr]
          .map((filter) => filter.query())
          .reduce((result, query) => ({ ...result, ...query }), {}),
      }),
      {},
    );
  }
}
