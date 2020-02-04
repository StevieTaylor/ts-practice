import { p } from '../tools/print';

p('-------------------类型推断-----------------');

/*
 * 一、类型推断发生在以下情况：
 *     1.初始化变量和成员
 *     2.设置默认参数值
 *     3.函数返回值
 */
let n = 123;
p(typeof n);
let s = 'type inference';
p(typeof s);

/**
 * 二、最佳通用类型, 若未找到, 推断结果为联合类型
 */
let arr_snb = [1, 'type', false]; // arr_snb:(string | number | boolean)[]
p(typeof arr_snb); // object

/**
 * 三、上下文类型
 *     1.TypeScript类型检查器使用window.onmousedown函数的类型来推断右边函数表达式的类型
 *     2.如果函数表达式不是在上下文类型的位置,event参数的类型需要指定为any
 */
// 未用到上下文类型,类型指定为any
window.onmousedown = (event: any) => {
  p(event.buttons);
};
// 指定上下文类型为 KeyboardEvent
window.onkeydown = (event: KeyboardEvent) => {
  p(`${event.key} 对应 ${event.keyCode}`);
};
