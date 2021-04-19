import { Filter, QueryBuilder } from './index';

it('query-builder test is null', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {is_null:null} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: null } });
});

it('query-builder test not null', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {not_null:null} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: null } });
});

it('query-builder test string equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {str_eq:'abc'} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc' } });
});

it('query-builder test string not equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {n_str_eq:'abc'} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: 'abc' } });
});

it('query-builder test string in', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {str_in:['abc','def','ghk']} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $in: ['abc', 'def', 'ghk'] } });
});

it('query-builder test string not in', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {n_str_in:['abc', 'def', 'ghk']} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $nin: ['abc', 'def', 'ghk'] } });
});

it('query-builder test regex', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {regex:/^./g} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $regex: /^./g } });
});

it('query-builder test number equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {num_eq:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 0 } });
});

it('query-builder test number not equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {n_num_eq:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: 0 } });
});

it('query-builder test number greater than', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {gt:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gt: 0 } });
});

it('query-builder test number less than', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {lt:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lt: 0 } });
});

it('query-builder test number greater than or equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {gte:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: 0 } });
});

it('query-builder test number less than or equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {lte:0} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lte: 0 } });
});

it('query-builder test number between', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {num_between:[0,1]} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gt: 0, $lt: 1 } });
});

it('query-builder test date equal', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {date_eq:current} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: current } });
});

it('query-builder test date not equal', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {n_date_eq:current} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $ne: current } });
});

it('query-builder test date before', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {before:current} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $lte: current } });
});

it('query-builder test date after', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {after: current} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: current } });
});

it('query-builder test date between', () => {
  const after: Date = new Date();
  const before: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {date_between: [after,before]} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $gte: after, $lte: before } });
});

it('query-builder test multiple operator on same field', () => {
  const operator: Filter<string> = Filter.newOperator("str_eq", 'abc');
  const operator2: Filter<string> = Filter.newOperator("n_str_eq", 'xyz');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {str_eq:'abc',n_str_eq:'xyz'} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc', $ne: 'xyz' } });
});

it('query-builder test multiple field', () => {
  const operator: Filter<string> = Filter.newOperator("str_eq", 'abc');
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ name: {str_eq:'abc'}, last_name: {str_eq:'abc'} });
  expect(queryBuilder.build()).toStrictEqual({ name: { $eq: 'abc' }, last_name: { $eq: 'abc' } });
});
