const Subject = 'Subject';
const Observable = 'Observable';
const Operators = 'Operators';

// 1. 用对象的方式导出变量
export { Subject, Observable, Operators };

// 2. 导出函数
export function create(value) {
  console.log('create:', value);
}

// 3. 导出类
export class ModuleA {
  constructor(moduleName) {}
}

// 4. import语句和export语句的复合
export { pi } from './moduleB';
// 相当于
// import { pi } from './moduleB';
// export { pi };
