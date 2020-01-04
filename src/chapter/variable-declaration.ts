import { p } from '../tools/print';

p('------------------变量声明----------------');
// var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
function f1() {
  var a = 10;
  return function f2() {
    var b = a + 1; // 找不到a去函数外找
    return b;
  };
}
var f3 = f1();
p(f3); // 返回的是f2()
p(f3()); // 返回的是f2()的执行11

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
