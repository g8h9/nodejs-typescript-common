import { Operator } from './operator';
const operators: Record<Operator, (value: any) => Filter<any>> = {
  [Operator.is_null]: (value: any = null) => new IsNull(value),
  [Operator.not_null]: (value: any = null) => new NotNull(value),
  [Operator.str_eq]: (value: string) => new StringEqualOperator(value),
  [Operator.n_str_eq]: (value: string) => new StringNotEqualOperator(value),
  [Operator.str_in]: (value: string[]) => new StringIn(value),
  [Operator.n_str_in]: (value: string[]) => new StringNotIn(value),
  [Operator.regex]: (value: RegExp) => new Regex(value),
  [Operator.num_eq]: (value: number) => new NumberEqual(value),
  [Operator.n_num_eq]: (value: number) => new NumberNotEqual(value),
  [Operator.gt]: (value: number) => new NumberGreaterThan(value),
  [Operator.lt]: (value: number) => new NumberLessThan(value),
  [Operator.gte]: (value: number) => new NumberGreaterThanOrEqual(value),
  [Operator.lte]: (value: number) => new NumberLessThanOrEqual(value),
  [Operator.num_between]: (value: number[]) => new NumberBetween(value),
  [Operator.date_eq]: (value: Date) => new DateEqual(value),
  [Operator.n_date_eq]: (value: Date) => new DateNotEqual(value),
  [Operator.before]: (value: Date) => new DateBefore(value),
  [Operator.after]: (value: Date) => new DateAfter(value),
  [Operator.date_between]: (value: Date[]) => new DateBetween(value),
};

abstract class Filters{
  value: Filter<any>[];
  constructor(value: Filter<any>[]){
    this.value = value;
  }

  query(): any{
    return this.value
          .map((filter) => filter.query())
          .reduce((result, query) => ({ ...result, ...query }), {})
  }
}

export abstract class Filter<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  abstract query(): any;

  static newOperator<V>(operator: Operator, value: V = null): Filter<V> {
    return operators[operator](value);
  }
}

class IsNull extends Filter<any> {
  query(): any {
    return { $eq: null };
  }
}

class NotNull extends Filter<any> {
  query(): any {
    return { $ne: null };
  }
}
class StringEqualOperator extends Filter<string> {
  query(): any {
    return { $eq: this.value };
  }
}

class StringNotEqualOperator extends Filter<string> {
  query(): any {
    return { $ne: this.value };
  }
}

class StringIn extends Filter<string[]> {
  query(): any {
    return { $in: this.value };
  }
}

class StringNotIn extends Filter<string[]> {
  query(): any {
    return { $nin: this.value };
  }
}

class Regex extends Filter<RegExp> {
  query(): any {
    return { $regex: this.value };
  }
}

class NumberEqual extends Filter<number> {
  query(): any {
    return { $eq: this.value };
  }
}

class NumberNotEqual extends Filter<number> {
  query(): any {
    return { $ne: this.value };
  }
}

class NumberGreaterThan extends Filter<number> {
  query(): any {
    return { $gt: this.value };
  }
}

class NumberLessThan extends Filter<number> {
  query(): any {
    return { $lt: this.value };
  }
}

class NumberGreaterThanOrEqual extends Filter<number> {
  query(): any {
    return { $gte: this.value };
  }
}

class NumberLessThanOrEqual extends Filter<number> {
  query(): any {
    return { $lte: this.value };
  }
}

class NumberBetween extends Filter<number[]> {
  query(): any {
    return { $gt: this.value[0], $lt: this.value[1] };
  }
}

class DateEqual extends Filter<Date> {
  query(): any {
    return { $eq: this.value };
  }
}

class DateNotEqual extends Filter<Date> {
  query(): any {
    return { $ne: this.value };
  }
}

class DateBefore extends Filter<Date> {
  query(): any {
    return { $lte: this.value };
  }
}

class DateAfter extends Filter<Date> {
  query(): any {
    return { $gte: this.value };
  }
}

class DateBetween extends Filter<Date[]> {
  query(): any {
    return { $gte: this.value[0], $lte: this.value[1] };
  }
}

class Or extends Filter<Filter<any>[]>{
  query(): any {
    return
  }

}
