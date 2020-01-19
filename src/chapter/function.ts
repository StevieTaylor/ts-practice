import { p } from '../tools/print';

p('-------------------函数-----------------');

/*
 * 一、函数类型 add,subtract,multiply,divide
 */
// 1.为函数定义类型
let add: (a: number, b: number) => number; // => 右边是类型
add = (n1: number, n2: number): number => n1 + n2; // => 右边是函数体
p('1+2=', add(1, 2));
// 2.完整的函数类型
let subtract: (a: number, b: number) => number = (
  n1: number,
  n2: number
): number => n1 - n2;
p('2-1=', subtract(2, 1));
// 3.使用接口定义函数类型
interface Multiply {
  (x: number, y: number): number;
}
let multiply: Multiply = (n1: number, n2: number): number => n1 * n2;
p('2*3=', multiply(2, 3));
// 4.使用类型别名
type Divide = (x: number, y: number) => number;
let divide: Divide = (n1: number, n2: number): number => n1 / n2;
p('1/2=', divide(1, 2));

/*
 * 二、函数参数
       1.可选参数
       2.默认参数
       3.剩余参数  
 */
// 1.可选参数
//   1.1.在Javascript里，每个参数都是可选的，如果不传的话就是undefined
//   1.2.在Typescript中，使用 ? 实现可选参数功能, 可选参数必须在必选参数之后
function OptionParams(arg1: string, arg2?: string) {
  return arg2 ? `${arg1},${arg2}` : arg1;
}
p(OptionParams('param1'));
p(OptionParams('param1', 'param2'));

// 2.默认参数
//   2.1.默认参数不需要放在必须参数的后面
function DefaultParams(arg1: string, defaultArg = 'default param') {
  return `${arg1},${defaultArg}`;
}
p(DefaultParams('param3'));
p(DefaultParams('param3', 'param4'));

// 可选参数和默认参数共享参数类型
function Power1(exp: number, base?: number) {
  return base ? Math.pow(base, exp) : Math.exp(exp);
}
// exp：指数，base：底数，power：幂
function Power2(exp: number, base = Math.E) {
  return Math.pow(base, exp);
}
// 共享类型
type Power = (exp: number, base?: number) => number;
p('e的2次方:', Power1(2));
p('e的2次方:', Power2(2));
p('3的4次方:', Power1(4, 3));
p('3的4次方:', Power2(4, 3));

// 3.剩余参数
function calculateSum(n1: number, ...restNumber: number[]) {
  let sum = 0;
  for (let i = 0; i < restNumber.length; i++) {
    sum += restNumber[i];
  }
  return n1 + sum;
}
p('sum:', calculateSum(1));
p('sum:', calculateSum(1, 2));
p('sum:', calculateSum(1, 2, 3));

/*
 * 三、函数重载
 */
function toArray(args: number): number[];
function toArray(args: string): string[];
function toArray(args: any): any {
  if (typeof args === 'number') {
    return args
      .toString()
      .split('')
      .map((i: string) => Number(i));
  } else if (typeof args === 'string') {
    return args.split('');
  }
}
p(toArray(123));
p(toArray('abc'));
