import { p } from '../tools/print';

p('-------------------泛型-----------------');

/*
 * 一、泛型
 */
function print<T>(...arg: T[]): void {
  console.log(...arg);
}
print<string>('111');
print(false); // 不需要传入泛型，编辑器会推断参数类型
/*
 * 二、泛型变量
 */
const getArrayLength = <T>(array: Array<T>): number => {
  return array.length;
};
p(
  '数组长度为:',
  getArrayLength<string>(['a', 'b', 'c', 'd'])
);
// 生成一个2维的元组
const geneTurple = <T, Y>(e1: T, e2: Y, n: number): [T, Y][] => {
  return new Array(n).fill([e1, e2]);
};
let turple = geneTurple('abc', 3.5415, 3);
p(turple);
turple.forEach((item: [string, number]) => {
  p(item[0].split(''));
  p(item[1].toFixed());
});
/*
 * 三、泛型类型
 */
// 3.1 泛型接口
interface GeneArray {
  <T>(e: T, n: number): T[];
}
const geneArray: GeneArray = <T>(element: T, n: number): T[] => {
  return new Array(n).fill(element);
};
// 3.2 带泛型的类型别名
type GeneratorArray = <T>(e: T, n: number) => T[];
const generatorArray: GeneratorArray = <T>(element: T, n: number): T[] => {
  return new Array(n).fill(element);
};

// 3.3 泛型类
// 类的静态属性不能使用这个泛型类型
class GenericClass<T> {
  public attr: T;
  constructor(attr: T) {
    this.attr = attr;
  }
  public getAttr = (): T => {
    return this.attr;
  };
  public setAttr = (attr: T): T => {
    this.attr = attr;
    return this.attr;
  };
}
const gcs: GenericClass<string> = new GenericClass<string>('string');
p(gcs);
p(gcs.getAttr());
p(gcs.setAttr('new string'));
const gcn: GenericClass<number> = new GenericClass<number>(1);
p(gcn);
p(gcn.getAttr());
p(gcn.setAttr(-1));

/*
 * 四、泛型约束
 */
interface Length {
  length: number;
}
// T类型继承接口Length,约束该类型必须带有length属性
const getLength = <T extends Length>(arg: T): number => {
  return arg.length;
};
// p(getLength(123));
p('length:', getLength([1, 2, 3, 4]));
p('length:', getLength('generics'));
p(
  'length:',
  getLength({
    length: 16
  })
);
/*
 * 五、泛型约束中使用类型参数
 */
const getProp = <T, K extends keyof T>(object: T, prop: K) => {
  return object[prop];
};
let obj = {
  k1: '属性1',
  k2: '属性2'
};
p(getProp(obj, 'k1'));
p(getProp(obj, 'k2'));
// p(getProp(obj, 'k3')); 没有k3
