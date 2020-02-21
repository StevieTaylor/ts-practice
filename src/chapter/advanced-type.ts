import { p } from '../tools/print';

p('-------------------高级类型-------------------');

// 交叉类型、联合类型、类型保护、null和undefined、
// 类型断言、类型别名、字面量类型、枚举成员类型、可辨识联合
// this类型、索引类型、映射类型、条件类型

/**
 * 一、交叉类型: 用 & 将多个类型合并为一个类型, 表示"且"的关系, 多用于对象合并
 */
const Assign = <T, K>(target: T, source: K): T & K => {
  let result = {} as T & K;
  result = Object.assign(target, source);
  return result;
};
p(Assign({ target: 'target' }, { source: 'source' }));
p(Assign({ target: 'target' }, ''));
p(Assign({ target: 'target' }, 123));
p(Assign({ target: 'target' }, false));

/**
 * 二、联合类型：用 | 将多个类型合并为一个类型, 表示"或"的关系
 *     1.如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
 */
const getWidth = (width: string | number): string => {
  return typeof width === 'number' ? `${width}px` : width;
};
p('width:', getWidth(50));
p('width:', getWidth('80px'));

// 交叉类型和联合类型的区别
interface Boss {
  name: string;
  age: number;
}
interface Worker {
  name: string;
  enterTime: string;
}
// 交叉类型的对象需要覆盖每个类型的所有属性
let intersection: Boss & Worker = {
  name: '交叉类型',
  age: 12,
  enterTime: '20190607'
};
p(intersection);
// 联合类型的对象需要满足其中一个类型
let union: Boss | Worker = {
  name: '联合类型',
  age: 112
};
p(union);
let union2: Boss | Worker = {
  name: '联合类型2',
  enterTime: '20191212'
};
p(union2);

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly(): any;
  layEggs(): any;
}

interface Fish {
  swim(): any;
  layEggs(): any;
}

// function getSmallPet(): Fish | Bird {
//    // ...
// }

// let pet = getSmallPet();
// pet.layEggs(); // okay
// pet.swim();    // errors

/**
 * 三、类型保护
 *     1. 类型谓词自定义类型保护
 *     2. typeof 关键字
 *     3. instanceof 关键字
 */
// 1. 类型谓词：paramName is Type(string、number、any interface...)
const isString = (value: number | string): value is string => {
  return typeof value === 'string';
};
const generatorItem = (): number | string => {
  return Math.random() < 0.5 ? 'item_string' : 123;
};
let item = generatorItem();
if (isString(item)) {
  p(item.split('_'));
} else {
  p(item.toFixed().split(''));
}
// 2. typeof 类型保护:
//    满足以下2个条件,TypeScript可以将它识别为一个类型保护
//    2.1.typeof value === 'typeName'或 typeof value !== 'typeName'
//    2.2.typeName 必须是'string','number','boolean','symbol'中的1种
if (typeof item === 'string') {
  p(item.split('_'));
} else if (typeof item === 'number') {
  p(item.toFixed().split(''));
} else {
  throw new Error(`Expected string or number`);
}

// 3. instanceof 类型保护:通过构造函数来细化类型的一种方式
class ItemA {
  public name = 'itemA';
  constructor() {}
}

class ItemB {
  public description = 'instance of itemB';
  constructor() {}
}

const GeneItemInstance = (): ItemA | ItemB => {
  return Math.random() < 0.5 ? new ItemA() : new ItemB();
};

let itemIns = GeneItemInstance();
if (itemIns instanceof ItemA) {
  p(itemIns.name);
} else {
  p(itemIns.description);
}

/**
 * 四、严格空类型检查：tsconfig.json文件中有个配置项strictNullChecks
 *    1.null和undefined
 *    2.可选参数和可选属性
 */
// 1.null和undefined:
//   1.1.strictNullChecks为true时, 不允许把null或undefined 赋值给其他类型变量
//   1.2.strictNullChecks为false时, 允许null或undefined赋值给其他类型
let strictMode = 'under strictNullChecks mode';
// strictMode = undefined;
// strictMode = null;
p(strictMode);

// 以下三种类型是不同的类型
type stringNull = string | null;
type stringUndefined = string | undefined;
type stringUndefinedNull = string | undefined | null;

// 2.可选参数和可选属性:会被自动地加上 | undefined
const StrictModeFunc = (x: number, y?: number) => {
  return x + (y || 0);
};
p(StrictModeFunc(1, 2));
p(StrictModeFunc(1, undefined));
// p(StrictModeFunc(1, null)); error

/**
 * 五、类型断言：
 *     1.使用<type>value 或 value as type
 *     2.非空断言符号 value！
 */
// 1.使用<type>value 或 value as type
interface TypeAssertion {
  type: string;
  assertion: boolean;
}
// 使用as告诉 Typescript指定类型
let type = { type: 'object' } as TypeAssertion;
let assertion = <TypeAssertion>{ assertion: true };
p(type.assertion); // undefined
p(assertion.type); // undefined

// 2.非空断言符号 ！去除类型里的 null 和 undefined
const getStaffName = (name: string | null): string => {
  const prefix = (type: string) => {
    return type + ':' + name!.toLocaleUpperCase(); // 如果没有!, 会提示对象可能为 "null"
  };
  name = name || '';
  return prefix('staff name');
};
p(getStaffName('francis underwood'));

/**
 * 六、类型别名：给一个类型起个新名字
 *     1.形式: type typeName = string | number
 *     2.起别名不会新建一个类型,它创建了一个新名字来引用那个类型。
 */
// 1.类型别名+联合类型
// 基础数据类型
type basicType = string | number | boolean | symbol | null | undefined;
// 复杂数据类型
type complexType = object | Array<any> | Date | Math;

// 2.类型别名中可以使用泛型, 也可以在对象的属性里引用自己
type TreeNode<T> = {
  element: T;
  childNode?: TreeNode<T>;
};
let htmlElements: TreeNode<string> = {
  element: 'html',
  childNode: {
    element: 'body',
    childNode: {
      element: 'div'
    }
  }
};
p(htmlElements);

// 3.类型别名无法引用自身?
type Tree = Array<Tree>;
let tree: Tree = [];
p(tree);

// 4.类型别名+交叉类型
type LinkedList<T> = T & { next: LinkedList<T> };
interface Node {
  node: string;
}
let first: LinkedList<Node>;
// let second = first.next.node;
// let third = first.next.next.node;

// 5.类型别名与接口的比较
// 5.1.类型别名可以实现与接口相同的类型约束
type TypeRename = {
  name: string;
};
interface TypeName {
  name: string;
}
let typeRename: TypeRename = { name: 'type rename' };
let typeName: TypeName = { name: 'new type name' };
p(typeRename);
p(typeName);
typeRename = typeName; // 二者兼容,都是对象

declare function RenameType(name: TypeRename): TypeRename;
declare function RenameType2(name: TypeName): TypeName;

// 5.2.类型别名无法使用extens和implements去扩展,接口可以
interface NewType extends TypeName {}

// 5.3.类型别名可以表示很多接口表示不了的类型,比如字面量类型
type Direction = 'top' | 'right' | 'bottom' | 'left';
let direction: Direction = 'right';

// 6.使用类型别名定义 字符串字面量类型
type Rainbow = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple';
// 7.使用类型别名定义 数字字面量类型
type responseCode = 200 | 201 | 404;

/**
 * 七、可辨识联合类型(又称作标签联合)
 *     1.具有普通的单例类型属性,作为可辨识的特征
 *     2.一个类型别名包含了那些类型的联合
 *     3.此属性上的类型保护
 */
// 矩形
interface Rectangle {
  type: 'rectangle';
  length: number;
  width: number;
}
// 三角形
interface Triangle {
  type: 'triangle';
  base: number; // 底
  height: number;
}
// 圆形
interface Circle {
  type: 'circle';
  radius: number; // 半径
}
// 正方形
interface Square {
  type: 'square';
  length: number;
}
// 定义图形的类型, type作为可辨识的特征
type Figure = Rectangle | Triangle | Circle;
// 当没有涵盖所有可辨识联合的变化时，需要做完整性检查
// 方法1: 打开 strictNullChecks:true, 指定返回值类型
const calculateArea = (f: Figure): number => {
  switch (f.type) {
    case 'rectangle':
      return f.length * f.width;
    case 'triangle':
      return 0.5 * f.base * f.height;
    case 'circle':
      return Number((Math.PI * f.radius ** 2).toFixed(3)); // 四舍五入保留3位
    default:
      return assertNever(f);
  }
};
// 方法2: 使用never类型
const assertNever = (n: never): never => {
  throw new Error('Unexpected object: ' + n);
};
p(
  '三角形面积:',
  calculateArea({
    type: 'triangle',
    base: 6,
    height: 8
  })
);
p(
  '圆的面积:',
  calculateArea({
    type: 'circle',
    radius: 4
  })
);

/**
 * 八、this类型:表示的是某个包含类或接口的子类型
 */
class BasicCalculator {
  constructor(public num: number) {}
  public getNum(): number {
    return this.num; // this表示当前类的实例
  }
  public Add(v: number): this {
    this.num += v;
    return this;
  }
  public Subtract(v: number): this {
    this.num -= v;
    return this;
  }
  public Multiply(v: number): this {
    this.num *= v;
    return this;
  }
  public Divide(v: number): this {
    this.num /= v;
    return this;
  }
}
let basicNumber = new BasicCalculator(10);
p(
  basicNumber
    .Multiply(2)
    .Divide(4)
    .Add(4)
    .Subtract(1)
    .getNum()
);
class ScientificCalculator extends BasicCalculator {
  constructor(num: number) {
    super(num);
  }
  public Pow(v: number): this {
    this.num = this.num ** v;
    return this;
  }
}
let scientificNumber = new ScientificCalculator(10);
p(
  scientificNumber
    .Pow(2)
    .Subtract(12)
    .Add(0)
    .getNum()
);

/**
 * 九、索引类型
 *     1.索引类型查询 keyof
 *     2.索引访问操作符 []
 */
// 1. 索引类型查询: keyof, 返回由类型的所有属性名组成的联合类型
interface PersonInfo {
  name: string;
  age: number;
}
let property: keyof PersonInfo; // "name" | "age"
property = 'name';
property = 'age';
// T: 某个interface的类型, 即PersonInfo
// keyof T: 这个interface的所有属性名组成的联合类型, 即 "name" | "age"
// K extends keyof T: K要么是name要么是age, 即 K:"name" 或 "age
// K[]: 字符字面量类型的数组, 即("name" | "age")[]
// T[K][]: 表示由属性值的类型组成的数组, 即 (string | number)[]
const getValues = <T, K extends keyof T>(object: T, props: K[]): T[K][] => {
  return props.map((n) => object[n]);
};
let personInfo: PersonInfo = { name: 'lux', age: 24 };
let infoValues: (string | number)[] = getValues(personInfo, ['name', 'age']); // 也可以写为 Array<string | number>
p(infoValues);

// 2. 索引访问操作符: []
const getValue = <T, K extends keyof T>(object: T, prop: K): T[K] => {
  return object[prop];
};
let name: string = getValue(personInfo, 'name');
let age: number = getValue(personInfo, 'age');
p(name, age);

// 3. 索引签名：
//    3.1.数字索引签名
interface NumberIndexSign<T> {
  [key: number]: T;
}
let key1: keyof NumberIndexSign<string> = 1; // 只能为number类型
//    3.2.字符串索引签名
interface StringIndexSign<T> {
  [key: string]: T;
}
let key2: keyof StringIndexSign<number> = 2; // 既可以是 number
let key3: keyof StringIndexSign<number> = 'key3'; // 也可以是 string
let propName: StringIndexSign<string> = {
  name: 'propName'
};
let key4: StringIndexSign<number>['age'] = 4;

// 4. 用keyof 返回可用类型
interface AllType {
  number: number;
  boolean: boolean;
  string: string;
  null: null;
  undefined: undefined;
  symbol: symbol;
  object: object;
  never: never;
}
// keyof 返回的类型不包含never
type availableType = AllType[keyof AllType];
// 等同于(never被排除)
type availabletype = string | number | boolean | symbol | object | null | undefined;

/**
 * 十、映射类型: 新类型以相同的形式去转换旧类型里的每个属性
 */
// 1. 只读属性映射
interface Device {
  name: string;
  type: string;
  number: string;
}
// T: 传入的interface类型
// P: 遍历出来的interface的每一个key
// T[P]: interface中每一个key对应的类型
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyDevice = ReadonlyType<Device>;
let readonlyDevice: ReadonlyDevice = {
  name: '只读设备',
  type: 'readonly',
  number: '20200211'
};
p(readonlyDevice);

// 2.可选属性映射
type Optional<T> = {
  [K in keyof T]?: T[K];
};
type OptionalDevice = Optional<Device>;
let optionalDevice: OptionalDevice = {
  name: '可选设备',
  type: 'optional'
};
p(optionalDevice);

type Keys = 'name' | 'age' | 'gender';
type PersonInfos = {
  readonly [K in Keys]: string;
};

// 3.部分属性选取映射
type Pickable<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PickName = Pickable<Device, 'name'>;
type PickNameAndType = Pickable<Device, 'name' | 'type'>;

// 4.创建类型：K是键的类型，T是值得类型
type Create<K extends keyof any, T> = {
  [P in K]: T;
};
type KeyValueString = Create<string, string>;
let obj_ss: KeyValueString = {
  key1: 'value1',
  key2: 'value2'
};
type keyNumberOrString = Create<number | string, string>;
/**
 * 通过回调函数映射每个属性值
 */
const MapValue = <K extends keyof number | string, T, U>(object: Record<K, T>, callback: (arg: T) => U) => {
  const result: any = {};
  for (let key in object) {
    if (object[key]) {
      result[key] = callback(object[key]);
    }
  }
  return result;
};
let obj_Length = {
  str: 'record',
  arr: [1, 2, 3, 4],
  obj: {
    length: 8
  }
};
p(MapValue(obj_Length, (item) => item.length));

// MT: 映射类型
interface MT {
  name: string;
  type: string;
  number: number;
}
// 5.Typescript封装好的
//    5.1. Readonly<T> 只读
type readonlyT = Readonly<MT>;
//    5.2. Partial<T> 可选
type PartialT = Partial<MT>;
//    5.3. Required<T> 必选
type RequiredT = Required<PartialT>;
//    5.4. Pick<T,K extend keyof T> 选取T中的K部分
type PickT = Pick<MT, 'name' | 'number'>;
//    5.5. Omit<T, K extends keyof any> 删除T中K的部分
type OmitT = Omit<MT, 'type'>;
//    5.6. Exclude<T,U> 排除T中和U相同(或兼容)的类型
type ExcludeT = Exclude<string | null, string | number>;
//    5.7. Extract<T,U> 提取T中和U相同(或兼容)的类型
type ExtractT = Extract<string | null, string | number>;
//    5.8. Record<K,T> 创建一个属性K类型，值T类型
type Record_NS = Record<number, string>;
//    5.9. NonNullable<T> 剔除T中的undefined和null
type NonNullableT = NonNullable<string | null | undefined>;
//    5.10. ReturnType<T) => any> 获取T的返回值类型
type returnType = ReturnType<() => string>;
//    5.11. InstanceType<T> 返回T的实例类型
type instanceType = InstanceType<typeof IT>;
//    5.12. Parameters<T> 返回函数参数类型组成的元组
type ParameterT = Parameters<(a: string, b: number) => string>;
//    5.13. ConstructorParameters<T> 获取构造方法的参数类型
type constructorParamT = ConstructorParameters<typeof IT>;
class IT {
  public I = 'instance';
  public T = 'Type';
  constructor(a: number, b: string) {}
}

// 6.同态：从一个代数结构到同类代数结构的映射, 它保持所有相关的结构不变
//    属于同态的有：Readonly、Partial、Pick
//    属于非同态的有：Record, 它并不需要输入类型来拷贝属性
type Proxy<T> = {
  get(): T;
  set(v: T): void;
};
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};
/**
 * 为属性添加get和set方法
 */
const proxify = <T>(object: T): Proxify<T> => {
  const result = {} as Proxify<T>;
  for (let key in object) {
    if (object[key]) {
      result[key] = {
        get: () => object[key],
        set: (value: any) => (object[key] = value)
      };
    }
  }
  return result;
};
/**
 * 拆包,移除get和set方法
 */
const unproxify = <T>(object: Proxify<T>): T => {
  const result = {} as T;
  for (let key in object) {
    if (object[key]) {
      result[key] = object[key].get();
    }
  }
  return result;
};
let origin = {
  name: '雀巢',
  type: 'coffee'
};
p('原始:', origin);
let proxified = proxify(origin);
p('代理:', proxified);
let unproxified = unproxify(proxified);
p('还原:', unproxified);

// 7. 增加和移除特定修饰符
type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};
type removeReadonlyDevice = RemoveReadonly<ReadonlyDevice>;

// 8. Typescript支持用number和symbol类型作为属性key的类型
const numberKey = 0;
const stringKey = 'key';
const symbolKey = Symbol();
type Mixed = {
  [numberKey]: number;
  [stringKey]: string;
  [symbolKey]: symbol;
};
type keysType = keyof Mixed;
let mixed: Mixed = {
  0: 8,
  key: 'value',
  [symbolKey]: Symbol()
};
p(mixed);

// 9. 映射元组
type ToPromise<T> = {
  [K in keyof T]: Promise<T[K]>;
};
type turple = [string, number, boolean];
let promiseTurple: ToPromise<turple> = [
  new Promise((resolve, reject) => resolve('string')),
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve(false))
];
p(promiseTurple);

/**
 *  十一、unknown类型：未知类型，与any类型对应的安全类型
 *        1. unknown类型比any类型更加严格, 在对unknown类型的值执行大多数操作之前，必须进行某种形式的检查
 *        2. any类型是TS的顶级类型，unknown类型是另一种顶级类型
 */
//  1. 任何类型都可以赋值给unknown
let unknown: unknown;
unknown = 123;
unknown = 'string';
unknown = undefined;

//  2. unknown赋值给其他类型的情况：
//    2.1. 一般情况下unknown不能赋值给其他类型(除了unknown和any)，也不能进行任何操作
let unknown2: unknown;
// let a:string = unknown2;  // 不能将类型“unknown”分配给类型“string”
// unknown2 += 1;
let unknown3: unknown = unknown2;
let any1: any = unknown2;

//    2.2. 当有 类型断言 或者 基于控制流的类型分析 时，可以赋值，也可以进行操作
(unknown3 as string) = 'type assertion';
p(unknown3);

let unknown4: unknown = 3;
// unknown3 += 1;
if (typeof unknown4 === 'number') {
  unknown4 += 1;
  p(unknown4);
}

// 3. unknown与其他任何类型交叉，都等于其他类型
type unknownAndString = unknown & string;
type unknownAndAny = unknown & any;
type unknownAndArray = unknown & number[];

// 4. unknown与其他类型(除any外)联合，都等于unknown
type unknownOrBoolean = unknown | boolean;
type unknownOrAny = unknown | any;
type unknownOrArray = string[] | unknown;

// 5. never类型是unknown类型的子类型
type TypeTrue = never extends unknown ? true : false;

// 6. keyof unknown 等于类型never
type TypeNever = keyof unknown;

// 7. 类型为unknown的值只能进行 相同或不等 运算(==,===,!=,!==)
let unknown5: unknown;
let unknown6: unknown;
if (unknown5 === unknown6) {
  p('相等');
} else if (unknown5 !== unknown6) {
  p('不相等');
}

// 8. 映射类型中如果遍历的类型是unknown，则不会映射任何属性
type Map<T> = {
  [P in keyof T]: T[P];
};
type mapAny = Map<any>;
type mapUnknown = Map<unknown>;

/**
 *  十二、条件类型:
 *            T extends U ? typeA : typeB , T 是否能够赋值给 U，如果是则为typeA，否则为typeB
 */
// 1. 条件类型的应用
type ConditionType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';
type CTS = ConditionType<string>;
type CTSL = ConditionType<'string literal'>; // 字符串字面量
type CTF = ConditionType<() => void>;
type CTSA = ConditionType<number[]>;

/**
 * 2. 分布式条件类型 Distributed Condition Type:
 *     在 T extends U ? X : Y 中，若T为 A | B | C，则会将T中的每一个类型逐个去进行判断
 *     被解析为 (A extends U ? X : Y) | (B extends U ? X : Y ) | (C extends U ? X : Y)
 */
// 移除T中可以赋值给U的类型
type Diff<T, U> = T extends U ? never : T;
// 保留T中可以赋值给U的类型
type Filter<T, U> = T extends U ? T : never;

type diff1 = Diff<string | number | boolean, string | null>;
type filter1 = Filter<string | number | boolean, string | null>;
type NonNull<T> = Diff<T, null | undefined>;

// 3. 条件类型+映射类型
type FilterFuncName<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  addPart(flag: boolean): string;
  updatePart(s: string): string;
}
type addPart = FilterFuncName<Part>;

// 4. 条件类型不允许递归地引用自己
// type ElementType<T> = T extends any ? ElementType<T> : T; // 类型别名“ElementType”循环引用自身。

// 定义一个条件类型：当传入的是数组时返回数组的元素的类型，当传入普通类型时返回该类型
type InferType<T> = T extends any[] ? T[number] : T; // number是索引，T[number]返回值的类型
type inferS = InferType<string[]>;
type _inferS = InferType<string>;

// 5. 条件类型中的类型推断 infer
type Infer<T> = T extends Array<infer U> ? U : T;
type inferN = Infer<number[]>;
type _inferN = Infer<number>;

// 6. 在协变位置上，同一个类型变量的多个候选类型会被推断为联合类型
type UnionInfer<T> = T extends { a: infer U; b: infer U } ? U : any;
type testUnion = UnionInfer<{ a: string; b: string }>; // string
type testUnion2 = UnionInfer<{ a: string; b: number }>; // string | number

// 7. 在抗变位置上，同一个类型变量的多个候选类型会被推断为交叉类型
type CrossInfer<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;
type testCross = CrossInfer<{ a: (x: string) => void; b: (x: string) => void }>; // string
type testCross2 = CrossInfer<{ a: (x: string) => void; b: (x: number) => void }>; // never (string & number = never)

// 8. 当推断具有多个调用签名（例如函数重载类型）的类型时，用最后的签名进行推断
declare function reload(x: string): string;
declare function reload(x: number): number;
declare function reload(x: number | string): number | string;
type reType = ReturnType<typeof reload>; // string | number
