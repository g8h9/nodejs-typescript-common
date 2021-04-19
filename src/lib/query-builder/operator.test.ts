import { Operator } from './operator';
it('test string to Operator', () => {
  const strEq:Operator = "str_eq" as Operator;
  expect(strEq).toBe(Operator.str_eq);
});
