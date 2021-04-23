import { UpdateQueryBuilder } from "./update-query-builder"

it('test with undefiend data',()=>{
  const expectData = UpdateQueryBuilder.newBuilder({name: 'test',age: undefined}).build();
  expect(expectData).toStrictEqual({name: 'test'});
})

it('test with null data',()=>{
  const expectData = UpdateQueryBuilder.newBuilder({name: 'test',age: null}).build();
  expect(expectData).toStrictEqual({name: 'test',age: null});
})

it('test with empty data',()=>{
  const expectData = UpdateQueryBuilder.newBuilder({}).build();
  expect(expectData).toStrictEqual({});
})
