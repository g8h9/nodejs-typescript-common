import { Filter, QueryBuilder, Operator } from './index';

it('query-builder test is null', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.is_null);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: null } });
});

it('query-builder test not null', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.not_null);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: null } });
});

it('query-builder test string equal', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.str_eq, 'abc');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc' } });
});

it('query-builder test string not equal', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.n_str_eq, 'abc');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: 'abc' } });
});

it('query-builder test string in', () => {
  const operator: Filter<string[]> = Filter.newOperator(Operator.str_in, ['abc', 'def', 'ghk']);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $in: ['abc', 'def', 'ghk'] } });
});

it('query-builder test string not in', () => {
  const operator: Filter<string[]> = Filter.newOperator(Operator.n_str_in, ['abc', 'def', 'ghk']);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $nin: ['abc', 'def', 'ghk'] } });
});

it('query-builder test regex', () => {
  const operator: Filter<RegExp> = Filter.newOperator(Operator.regex, /^./g);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $regex: /^./g } });
});

it('query-builder test number equal', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.num_eq, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 0 } });
});

it('query-builder test number not equal', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.n_num_eq, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: 0 } });
});

it('query-builder test number greater than', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.gt, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gt: 0 } });
});

it('query-builder test number less than', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.lt, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lt: 0 } });
});

it('query-builder test number greater than or equal', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.gte, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: 0 } });
});

it('query-builder test number less than or equal', () => {
  const operator: Filter<number> = Filter.newOperator(Operator.lte, 0);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lte: 0 } });
});

it('query-builder test number between', () => {
  const operator: Filter<number[]> = Filter.newOperator(Operator.num_between, [0, 1]);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gt: 0, $lt: 1 } });
});

it('query-builder test date equal', () => {
  const current: Date = new Date();
  const operator: Filter<Date> = Filter.newOperator(Operator.date_eq, current);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: current } });
});

it('query-builder test date not equal', () => {
  const current: Date = new Date();
  const operator: Filter<Date> = Filter.newOperator(Operator.n_date_eq, current);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: current } });
});

it('query-builder test date before', () => {
  const current: Date = new Date();
  const operator: Filter<Date> = Filter.newOperator(Operator.before, current);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lte: current } });
});

it('query-builder test date after', () => {
  const current: Date = new Date();
  const operator: Filter<Date> = Filter.newOperator(Operator.after, current);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: current } });
});

it('query-builder test date between', () => {
  const after: Date = new Date();
  const before: Date = new Date();
  const operator: Filter<Date[]> = Filter.newOperator(Operator.date_between, [after, before]);
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: after, $lte: before } });
});

it('query-builder test multiple operator on same field', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.str_eq, 'abc');
  const operator2: Filter<string> = Filter.newOperator(Operator.n_str_eq, 'xyz');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator, operator2] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc', $ne: 'xyz' } });
});

it('query-builder test multiple field', () => {
  const operator: Filter<string> = Filter.newOperator(Operator.str_eq, 'abc');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: [operator], last_name: [operator] });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc' }, last_name: { $eq: 'abc' } });
});
