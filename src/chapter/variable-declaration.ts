import { p } from '../tools/print';

p('------------------变量声明----------------');
/**
 * 1.var 声明,
 *   1.1 可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
 *   1.2 可以重复声明同一个变量
 */
function varFun1() {
  var a = 10;
  return function varFun2() {
    var b = a + 1; // 找不到a去函数外找
    return b;
  };
}
var varFun3 = varFun1();
// p(varFun3); // 返回的是varFun2()
p(varFun3()); // 返回的是varFun2()的执行11

function varFun4() {
  var varA = 'varA';
  var varA = 'varA_changed';
  return varA;
}
p(varFun4());

// 期望通过for循环每隔 0.1s 打印 i 的值
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    // console.log(i);
  }, 100 * i);
} // 结果为打印10次10

// 使用立即执行的函数表达式来捕获每次循环时 i 的值
for (var j = 0; j < 10; j++) {
  (function(j) {
    // setTimeout(() => console.log(j), 100 * j);
  })(j);
}

// 使用let 解决问题：不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域
for (let i = 0; i < 10; i++) {
  // setTimeout(() => console.log(i), 100 * i);
}

/**
 * 2.let 声明
 *   2.1 当用let声明一个变量，它使用的是词法作用域或块作用域
 *   2.2 块级作用域特点：不能在被声明之前读或写,也就是说必须先声明
 *   2.3 不能在同一个作用域内多次声明同一个变量
 */
function letFun1(flag: boolean) {
  let a = 20;
  if (flag) {
    let b = a + 1;
    return b;
  }
  // return b;
}
p(letFun1(true));

// catch语句里的块级作用域
try {
  p('error');
} catch (error) {
  p(error);
}
// p(error); 无法打印error,因为它在块级作用域里

function letFun2() {
  return variableA; // 找不到就去外部找
}
p('变量声明前', letFun2()); // undefined,不能在变量声明前调用该函数
let variableA: any = '变量A';
p('变量声明后', letFun2()); // 变量A

function letFun3() {
  let letA = 'letA';
  // let letA = 'letA_changed'; // 无法重新声明块范围变量“letA”
  return letA;
}

/*
 * 屏蔽shadow：在一个嵌套的作用域里 引入了一个新名字
 *            会造成问题：类型不匹配
 */
function shadowFun(flag: boolean, value: number) {
  if (flag) {
    let value = 'shadowed value'; // Shadowed name: 'value'
    return value;
  }
  return value;
}
p(shadowFun(true, 123));
p(shadowFun(false, 123));

/*
 * 3.const 声明 constant 常量
 *   3.1 和let一样的块级作用域
 *   3.2 被赋值后不能再改变,但变量内部的值可以修改
 *   3.3 无法重新声明
 */
const const_variable = 'const_variable';
// const const_variable = 'change'; 无法重新声明块范围变量“const_variable”
// const_variable = 'unchangeable';
const const_object = {
  constKey1: 'value1',
  constKey2: 'value2'
};
// const_object = { 引用的值是无法修改的
//   constKey1: 'changeValue1',
//   constKey2: 'changeValue2'
// }
p('const_obj:', const_object);
const_object.constKey1 = 'changeValue1'; // 内部的值可以修改
p('const_obj:', const_object);

const const_arr = [1, 2, 3, 'a'];
p('const_arr:', const_arr);
const_arr[1] = '2';
const_arr[4] = 'b';
p('const_arr:', const_arr);

// 用const定义函数
const sum = (n1: number, n2: number) => {
  return n1 + n2;
};
p(sum(1024, 996));

p('------------------解构赋值----------------');

/*
 * 4. 解构赋值
 */

// 4.1 数组解构
const arr_num: number[] = [1, 2, 3, 4, 5];
p('数组解构:', arr_num);
const [i1, i2, i3, i4, i5] = arr_num;
p(i1, i2, i3, i4, i5);
const [a1, a2, ...rest] = arr_num; // 结合剩余变量
p(a1, a2, rest);
const [b1, , b2, , b3] = arr_num;
p(b1, b2, b3);
const [c1] = arr_num;
p(c1);
const [d1, d2, , d3] = arr_num;
p(d1, d2, d3);

// 4.2 对象解构
let person = {
  name: 'jack',
  age: 27,
  gender: 'male'
};
p('对象解构:', person);
let { name, age } = person;
p('name:', name, ' age:', age);
// 赋值
({ name, age } = { name: 'lucy', age: 25 });
p('name:', name, ' age:', age);
p(person); // person没有变

// 使用...来解析剩余变量
let triangle = {
  side_a: 6,
  side_b: 8,
  side_c: 10
};
p('三角形三边长', triangle);
let { side_a, ...restSide } = triangle;
p('side_a:', side_a); // 6
p('剩余边长:', restSide); // {side_b: 8, side_c: 10}
p('side_b:', restSide.side_b);
p('side_c', restSide.side_c);

// 属性重命名
let renameAttr = {
  attr1: '属性1',
  attr2: '属性2'
};
p(renameAttr);
let { attr1: newAttr1, attr2: newAttr2 } = renameAttr;
p(newAttr1, newAttr2);
p(renameAttr); // {attr1: "属性1", attr2: "属性2"}, 重命名之后, 对象不会变

// 函数声明
type Person = { name: string; age: number };
function getPersonInfo({ name, age }: Person) {
  return `${name}的年龄是${age}`;
}
p(getPersonInfo({ name: 'stevie', age: 27 }));

/*
 * 5.展开
 */
// 5.1 数组展开,浅拷贝
const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8];
const arr_merge = [...arr1, ...arr2];
p(arr1, '和', arr2, '合并后:', arr_merge);

// 5.2 对象展开
let Cat = {
  type: '猫',
  food: '猫粮'
};
p('猫:', Cat);
// 后面的属性会覆盖前面的属性
let Garfield = { food: '高级猫粮', ...Cat };
p('加菲猫:', Garfield); // {food: "猫粮", type: "猫"}
let Ragdoll = { ...Cat, food: '普通猫粮' };
p('布偶猫:', Ragdoll); // {type: "猫", food: "普通猫粮"}

// 利用对象展开合并2个对象,后者会覆盖前者相同的属性
let obj1 = {
  type: 'object',
  value: 'value1',
  attr: 'attr1'
};
let obj2 = {
  type: 'object',
  value: 'value2',
  func() {
    return obj2;
  }
};
let o1_o2 = { ...obj1, ...obj2 };
p(o1_o2);
let o2_o1 = { ...obj2, ...obj1 };
p(o2_o1);
