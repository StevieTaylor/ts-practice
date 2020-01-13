import { p } from '../tools/print';

p('-------------------接口-----------------');

/**
 * 一、基本用法：约束对象的类型
 */
interface PersonName {
  firstName: string;
  lastName: string;
}

const getName = ({ firstName, lastName }: PersonName): string => {
  return `全名: ${firstName} ${lastName}`;
};
p(getName({ firstName: 'Stevie', lastName: 'Hoang' }));

/**
 * 二、可选属性 ?
 */
const showPersonInfo = (personInfo: PersonInfo) => {
  if (personInfo.job) {
    return `${personInfo.name},${personInfo.age}岁,职业为${personInfo.job}`;
  } else {
    return `${personInfo.name},${personInfo.age}岁,暂无工作`;
  }
};

interface PersonInfo {
  name: string;
  age: number;
  job?: string;
}
p(showPersonInfo({ name: 'frank', age: 25, job: '程序员' }));
p(showPersonInfo({ name: 'lucy', age: 23 }));

/*
 * 三、多余属性检查
       绕开多余属性检查的方式：
 *       1.类型推断
 *       2.索引签名
 *       3.类型兼容性
 */
// 1.类型推断
p(
  showPersonInfo({
    name: 'ming',
    age: 20,
    job: '学生',
    hobby: '打球'
  } as PersonInfo)
);

// 2.类型兼容性
const person_li = {
  name: '小李',
  age: 28,
  hobby: '健身'
};
p(showPersonInfo(person_li));

// 3.索引签名
interface CardInfo {
  type: string;
  cardNo: string;
  [prop: string]: string;
}
const getCardInfo = ({ type, cardNo, expiredTime, authority }: CardInfo) => {
  return `${type}, 卡号:${cardNo}, 有效期:${expiredTime}, 权限:${authority}`;
};
p(
  getCardInfo({
    type: '员工卡',
    cardNo: '1001',
    expiredTime: '1年',
    authority: '门禁'
  })
);

/*
 * 四、只读属性,一些对象属性只能在对象刚刚创建的时候修改其值。
 */
interface ReadOnly {
  normalAttr: string;
  readonly readonlyAttr: string;
}
let ro: ReadOnly = {
  normalAttr: '普通属性',
  readonlyAttr: '只读属性'
};
p(ro);
ro.normalAttr = '可以修改';
p(ro);
// vari.readonlyAttr = '无法修改';

/*
 * 五、函数类型
 */
interface IndexFunc {
  (str: string, letter: string): number;
}
const firstIndex: IndexFunc = (str, letter) => {
  return str.indexOf(letter);
};
p(firstIndex('Angular and Typescript', 'a'));
// 推荐使用 类型别名 的方式来定义函数类型
type indexFunc = (str: string, letter: string) => number;
const lastIndex: indexFunc = (str, letter) => {
  return str.lastIndexOf(letter);
};
p(lastIndex('Angular and Typescript', 'a'));

/*
 * 六、索引类型
 */
interface StringArray {
  [number: number]: string;
}
let stringArray: StringArray = ['string', 'array'];
p(stringArray);

/*
 * 七、继承接口
 */
interface Animal {
  type: string;
  life: number;
}
// 7.1 接口继承接口
interface Dog extends Animal {
  loyalty: string;
}
let teddy: Dog = {
  type: '泰迪',
  life: 12,
  loyalty: '忠诚'
};
p(teddy);

// 7.2 接口继承类
class ClassAnimal {
  public type: string;
  public life: number;
  // private life: number;
  constructor(type: string, life: number) {
    this.type = type;
    this.life = life;
  }
}
interface Cat extends ClassAnimal {
  catType: string;
}
let persian: Cat = {
  type: '猫',
  life: 12,
  catType: '波斯猫'
};
p(persian);

/*
 * 八、混合类型接口,一个对象可以同时做为函数和对象使用，并带有额外的属性。
 */
interface Counter {
  num: number;
  (): void;
}
const getCounter = (): Counter => {
  const c = () => c.num++;
  c.num = 0;
  return c;
};
const counter: Counter = getCounter();
for (let i = 0; i < 3; i++) {
  counter();
  p(counter.num);
}
p(counter);
