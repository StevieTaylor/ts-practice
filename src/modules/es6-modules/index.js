import { Observable, Operators, Subject, pi } from './moduleA';
import { create, ModuleA } from './moduleA';
// 导入时重命名
import { Scheduler as Schedulers } from './moduleB';
import { time } from './moduleB';

// 使用通配符*导入整个模块，并且取名为moduleB
import * as moduleB from './moduleB';

// 导入默认模块可以直接重命名
import DefaultC, { getTitle } from './defaultC';
// 导入的是default，重命名为ModuleC
import { default as ModuleC } from './defaultC';

// moduleA
console.log(Observable, Operators, Subject);
create('pipe');
const insA = new ModuleA('模块A');
console.log(insA);
const insB = new ModuleA();
console.log(insB);

// moduleB
console.log(Schedulers, moduleB.Observer, moduleB.Subscription);
console.log(moduleB);

setInterval(() => {
  //   console.log(time); 导入的值是动态的
}, 1000);

getTitle();
new DefaultC().getDomain();
new ModuleC().getLocation();

console.log('pi:', pi);
