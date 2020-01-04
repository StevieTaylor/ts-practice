import { p } from '../tools/print';

p('-------------------基本类型-----------------');

// 1.布尔类型
let isDone: boolean = false;
p('isDone:', isDone);

// 2.数字类型
let decimal: number = 123; // 十进制
let binary: number = 0b10101100; // 二进制,以0b开头
let octal: number = 0o127; // 八进制,以0o开头
let hexadecimal: number = 0x123ab; // 十六进制,以0x开头
p('十进制：', decimal);
p('二进制：', binary);
p('八进制：', octal);
p('十六进制：', hexadecimal);

// 3.字符串类型
let str1: string = '一般字符串';
let str2: string = `模板字符串`;
p(`${str1},${str2}`);

// 4.数组类型
let arr_number: number[] = [1, 2, 3];
let arr_string: Array<string> = ['a', 'b', 'c'];
p('纯数字数组：', arr_number);
p('纯字符串数组：', arr_string);
// 使用联合类型指定数组元素
let arr_numAndStr: (number | string)[] = [1, 2, 3, 'a', 'b', 'c'];
let arr_strAndNum: Array<string | number> = ['a', 'b', 'c', 1, 2, 3];
p('数字+字符串混合数组：', arr_numAndStr);
p('字符串+数字混合数组：', arr_strAndNum);

// 5.元组类型Tuple,元组类型允许表示一个已知元素数量和类型的数组，
//   a.各位置类型一一对应
//   b.各元素的类型不必相同。
let tuple: [number, boolean, string];
tuple = [1, false, 'string'];
p('元组:', tuple);
p('第2个元素:', tuple[0]);
p('第2个元素:', tuple[1]);
p('第3个元素:', tuple[2].split(''));
p('元组无法访问越界元素');

// 6.枚举类型,本质是对象
// 6.1 基本使用
enum Message {
  Info,
  Warning,
  Error
}
// 等同于
let Msg = {
  0: 'Info',
  1: 'Warning',
  2: 'Error',
  Info: 0,
  Warning: 1,
  Error: 2
};
p('枚举类型 enum');
p('枚举Message:', Message);
p('等同于Msg:', Msg);
p('Message[0]:', Message[0]);
p('Message.error:', Message.Error);
// 6.2修改下标
enum Roles {
  User,
  Admin = 3,
  SuperAdmin
}
p('前面user的下标不受影响', Roles.User);
p('后面SuperAdmin的下标受影响', Roles.SuperAdmin);

// 7.any任何类型
let value_any: any;
let arr_any: any[] = [1, 2, true, false, 'str1'];
p('any数组:', arr_any);

// 8.void类型,与any相反,多用于函数
function ConsoleLog(value: any): void {
  console.log('打印:', value);
}
ConsoleLog('一些文字');

// 9.undefined类型, 既是类型又是值
let u: undefined;
let un: undefined;
un = undefined;
p('undefined:', u, un);

// 10.null类型, 既是类型又是值
let n: null = null;
p('null:', n);

// 11.never类型,表示的是那些永不存在的值的类型
//    第一种情况：总是会抛出异常
const showError = (errorMsg: string): never => {
  throw new Error(errorMsg);
};
// showError('aa');

//    第二种情况：根本就不会有返回值的函数表达式
const infiniteLoop = (): never => {
  while (true) {}
};
// a. never类型是任何类型的子类型，也可以赋值给任何类型
// b. 没有类型是never的子类型或可以赋值给never类型
// let neverValue = (() => {
//   while (true) {}
// })();
// let neverToString: string;
// neverToString = neverValue;

// 12.Object类型,除6种JS基本类型(number,boolean,string,null,undefined,symbol)以外的复杂类型
let obj1 = {
  key1: 'value1',
  key2: 'value2'
};
p(obj1);
let obj2 = obj1;
obj2.key2 = 'changeValue';
p(obj1);
p(obj2);

// 13.类型断言,类似于java里的类型转换,可以使用<type>或者 as语法
function getLen(value: number | string): number {
  if ((<string>value).length || (<string>value).length === 0) {
    return (value as string).length;
  } else {
    return value.toString().length;
  }
}
let str: string = 'string';
p(`${str}的长度:`, getLen(`${str}`));
p('12345的长度:', getLen(12345));
