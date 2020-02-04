import { p } from '../tools/print';

p('-------------------ES6类--------------------');

/*
 * 一、创建实例
 */
function Point_es5(x, y) {
  this.x = x;
  this.y = y;
  p(this);
}
Point_es5.prototype.getPos = function() {
  return '坐标:(' + this.x + ',' + this.y + ')';
};
let point_es5 = new Point_es5(1, 2);
p(point_es5);
p(point_es5.getPos());

class Point_es6 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getPos() {
    return `坐标:(${this.x},${this.y})`;
  }
}
let p2 = new Point_es6(3, 4).getPos();
p(p2);

/*
 * 二、constructor
 */
/*
 * 三、类的实例
 */
/*
 * 四、取值函数与存值函数
 */
/*
 * 五、class表达式
 */
/*
 * 六、静态方法
 */
/*
 * 七、实例属性其他写法
 */
/*
 * 八、实现私有方法
 */
