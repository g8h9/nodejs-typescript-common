import { Filters } from './filter';

export abstract class QueryBuilder {
  static newBuilder(query: {
    filter: Record<string, Record<string, any>>,
    sort?: string[],
    map?: string[]}
  ): QueryBuilder {
    return new MongoQueryBuilder(query.filter, query.sort, query.map);
  }

  abstract build(): any;
}

class MongoQueryBuilder extends QueryBuilder {
  filter: Record<string, Filters>;
  sort: string[];
  map: string[];

  constructor(filter: Record<string, Record<string, any>>, sort?: string[], map?: string[]) {
    super();
    this.filter = Object.keys(filter).reduce(
      (acc: Record<string, Filters>, crr: string) => ({ ...acc, [crr]: Filters.parse(filter[crr]) }),
      {},
    );
    this.sort = sort || [];
    this.map = map || [];
  }

  build(): Record<string,any> {
    return {
      filter: this.buildFilter(),
      map: this.buildMap(),
      sort: this.buildSort()
    }
  }

  private buildFilter(): Record<string,any>{
    return (Object.keys(this.filter) as string[]).reduce(
      (acc: Record<string, any>, crr: string) => ({
        ...acc,
        [crr]: this.filter[crr].query(),
      }),
      {},
    );
  }

  private buildSort(): string{
    return this.sort.join(' ');
  }

  private buildMap(): string[]{
    return this.map;
  }
}
