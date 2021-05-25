/*
 * @Author: Stevie
 * @Date: 2021-05-25 10:51:06
 * @LastEditTime: 2021-05-25 11:40:16
 * @LastEditors: Stevie
 * @Description: typescript装饰器
 */
import { p } from '../tools/print';

p('-------------------装饰器-------------------');


class Prop {
  @init(16)
  age: number
}

function init(age: number) {
  return function (target: any, key: string) {
    target[key] = age
    return target
  }
}

const prop = new Prop
console.log(prop.age)