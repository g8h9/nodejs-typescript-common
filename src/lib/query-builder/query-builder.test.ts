import { QueryBuilder } from './index';

it('query-builder test is null', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { is_null: null } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $eq: null } }, map: [], sort: '' });
});

it('query-builder test not null', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { not_null: null } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $ne: null } }, map: [], sort: '' });
});

it('query-builder test string equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { str_eq: 'abc' } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $eq: 'abc' } }, map: [], sort: '' });
});

it('query-builder test string not equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { n_str_eq: 'abc' } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $ne: 'abc' } }, map: [], sort: '' });
});

it('query-builder test string in', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { str_in: ['abc', 'def', 'ghk'] } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $in: ['abc', 'def', 'ghk'] } }, map: [], sort: '' });
});

it('query-builder test string not in', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { n_str_in: ['abc', 'def', 'ghk'] } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $nin: ['abc', 'def', 'ghk'] } }, map: [], sort: '' });
});

it('query-builder test regex', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { regex: /^./g } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $regex: /^./g } }, map: [], sort: '' });
});

it('query-builder test number equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { num_eq: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $eq: 0 } }, map: [], sort: '' });
});

it('query-builder test number not equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { n_num_eq: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $ne: 0 } }, map: [], sort: '' });
});

it('query-builder test number greater than', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { gt: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $gt: 0 } }, map: [], sort: '' });
});

it('query-builder test number less than', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { lt: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $lt: 0 } }, map: [], sort: '' });
});

it('query-builder test number greater than or equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { gte: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $gte: 0 } }, map: [], sort: '' });
});

it('query-builder test number less than or equal', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { lte: 0 } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $lte: 0 } }, map: [], sort: '' });
});

it('query-builder test number between', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { num_between: [0, 1] } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $gt: 0, $lt: 1 } }, map: [], sort: '' });
});

it('query-builder test date equal', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { date_eq: current } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $eq: current } }, map: [], sort: '' });
});

it('query-builder test date not equal', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { n_date_eq: current } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $ne: current } }, map: [], sort: '' });
});

it('query-builder test date before', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { before: current } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $lte: current } }, map: [], sort: '' });
});

it('query-builder test date after', () => {
  const current: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { after: current } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $gte: current } }, map: [], sort: '' });
});

it('query-builder test date between', () => {
  const after: Date = new Date();
  const before: Date = new Date();
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { date_between: [after, before] } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $gte: after, $lte: before } }, map: [], sort: '' });
});

it('query-builder test multiple operator on same field', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({ filter: { name: { str_eq: 'abc', n_str_eq: 'xyz' } } });
  expect(queryBuilder.build()).toStrictEqual({ filter: { name: { $eq: 'abc', $ne: 'xyz' } }, map: [], sort: '' });
});

it('query-builder test multiple field', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({
    filter: { name: { str_eq: 'abc' }, last_name: { str_eq: 'abc' } },
  });
  expect(queryBuilder.build()).toStrictEqual({
    filter: { name: { $eq: 'abc' }, last_name: { $eq: 'abc' } },
    map: [],
    sort: '',
  });
});

it('query-build test build map and sort', () => {
  const queryBuilder: QueryBuilder = QueryBuilder.newBuilder({
    filter: { name: { str_eq: 'abc' }, last_name: { str_eq: 'abc' } },
    map: ['name', 'lastname'],
    sort: ['+name', '-lastname'],
  });
  const expectResult = queryBuilder.build();
  expect(expectResult.filter).toStrictEqual({ name: { $eq: 'abc' }, last_name: { $eq: 'abc' } });
  expect(expectResult.map).toEqual(expect.arrayContaining(['lastname','name']));
  expect(expectResult.sort).toStrictEqual('+name -lastname');
});
