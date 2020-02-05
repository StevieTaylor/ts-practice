import { p } from '../tools/print';

p('-------------------类型兼容性-----------------');

/**
 * Typescript的类型兼容是基于结构子类型
 *   1.结构类型：一种只使用其成员来描述类型的方式
 *   2.名义类型：通过明确的声明或者类型的名称来决定数据类型的兼容性或等价性
 */

interface Name {
  name: string;
}
class Personal {
  constructor(public name: string) {
    this.name = name;
  }
}
let name: Name;
name = new Personal('jack');

/*
 * 一、类型兼容性：
      1.基本规则：如果A兼容B, 则B至少包含A的所有属性
      2.通俗解释：可以多赋少, 多了没关系, 兼容
 */
interface TypeA {
  height: string;
}
interface TypeB {
  height: string;
  width: string;
}
interface TypeC {
  width: string;
}
let A: TypeA = {
  height: '100px'
};
let B: TypeB = {
  height: '200px',
  width: '200px'
};
let C: TypeC = {
  width: '300px'
};
A = B; // B上存在A所需的属性 height
// B = A; 报错, A上缺失了B所需的属性 width
// A = C;

/*
 * 二、函数的兼容性
       1.参数个数
       2.参数类型
       3.返回值类型
       4.可选参数及剩余参数
       5.参数双向协变
       6.函数重载
 */
// 1.参数个数：少赋多
let funA = (a: number) => 0;
let funB = (b1: number, b2: number) => 0;
p(funB);
// funA = funB;
funB = funA;
p(funB);

// 允许"忽略"参数, 例如 数组的方法里的回调
let elements = ['e1', 'e2', 'e3'];
p(elements);
// map回调本来有3个参数
elements.map((item, index, arr) => {
  p(`元素:${item}`, `下标:${index}`);
});
// map回调可以只传一个参数
let newElements = elements.map((item: string) => item.replace('e', 'element'));
p(newElements);

// 2.参数类型
let funC = (c: string) => 0;
// funC = funA;
// funA = funC;

// 3.返回值类型: 可以多赋少
let funX = () => ({ name: 'jack' });
let funY = () => ({ name: 'jack', age: 26 });
funX = funY;
// funY = funX;

// 4.可选参数及剩余参数
const getArraySum = (
  arr: number[],
  callback: (...args: number[]) => number
) => {
  return callback(...arr);
};
const Reduce = (...args: number[]): number => {
  return args.reduce((a, b) => a + b, 0);
};
const SumThree = (a: number, b: number, c: number) => {
  return a + b + c;
};
p('reduce方法计算:', getArraySum([1, 2, 3], Reduce));
p('直接求和计算:', getArraySum([1, 2, 3], SumThree));

// 5.函数参数双向协变
let funcP = (p: string | number): void => {};
let funcQ = (q: string): void => {};
// funcP = funcQ;
funcQ = funcP;

// 6.函数重载
function Add(a: string, b: string): string;
function Add(a: number, b: number): number;
function Add(a: any, b: any) {
  return a + b;
}
let add = Add;
p(add); // add:Add
interface Add {
  (a: string, b: string): string;
  (a: number, b: number): number;
}
function Sum(a: number, b: number): number;
function Sum(a: any, b: any) {
  return a + b;
}
let sum = Sum;
p(sum);
// add = sum;
sum = add; // 可以多赋少

/**
 *  三、枚举兼容性:
 *     1.数字枚举类型与数字兼容
 *     2.不同枚举类型之间不兼容
 */
enum Progress {
  Start,
  End
}
enum FinishStatus {
  Finished = 1,
  Unfinished = 0
}
enum Progress_S {
  Start = 'start',
  End = 'end'
}
let start = Progress.Start; // start：Progress
start = 1; // 与数字兼容
// start = FinishStatus.Unfinished; 不兼容
let start_s = Progress_S.Start;
// start_s = Progress.Start; 不兼容

/**
 *  四、类的兼容性
 *      1.类有静态部分和实例部分, 比较类类型的对象时, 只比较实例成员, 不比较静态成员和构造函数
 *      2.private和protected影响兼容性, 如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员
 */
class ClassA {
  public static staticA: string;
  constructor(instanceA: string) {}
}

class ClassB {
  public static staticB: string;
  constructor(instanceB: string) {}
}

class ClassC {
  constructor(instanceC: number) {}
}
let instanceA: ClassA = new ClassA('instanceA');
let instanceB: ClassB = new ClassB('instanceB');
let instanceC: ClassC = new ClassC(3);
instanceA = instanceB;
instanceB = instanceC;
instanceC = instanceA;

// private和protected
class Animal {
  private type: string;
  constructor(type: string) {
    this.type = type;
  }
}
class Dog extends Animal {
  constructor(type: string) {
    super(type);
  }
}
class Cat {
  private type: string;
  constructor(type: string) {
    this.type = type;
  }
}
let animal = new Animal('animal');
let dog: Animal = new Dog('dog');
// let cat:Animal = new Cat('cat'); 类型具有私有属性“type”的单独声明。

/**
 *  五、泛型兼容性
 */
interface DataOfNull<T> {}
let val_s: DataOfNull<string> = {};
let val_n: DataOfNull<number> = {};
val_s = val_n;

interface DataWithType<T> {
  type: T;
}
let data_s: DataWithType<string> = { type: '111' };
let data_b: DataWithType<boolean> = { type: false };
// data_s = data_b;
