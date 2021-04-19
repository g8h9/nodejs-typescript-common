import { Filters } from "./filter";

export abstract class QueryBuilder {
  static newBuilder(filter: Record<string, Record<string,any>>): QueryBuilder {

    return new MongoQueryBuilder(filter);
  }

  abstract build(): any;
}

class MongoQueryBuilder extends QueryBuilder {
  filter: Record<string, Filters>;

  constructor(filter: Record<string, Record<string,any>>) {
    super();
    this.filter = Object.keys(filter).reduce((acc:Record<string,Filters>,crr:string)=> ({...acc,[crr]:Filters.parse(filter[crr])}),{});
  }

  build(): Record<string, any> {
    return (Object.keys(this.filter) as string[]).reduce(
      (acc: Record<string, any>, crr: string) => ({
        ...acc,
        [crr]: this.filter[crr].query()
      }),
      {},
    );
  }
}
