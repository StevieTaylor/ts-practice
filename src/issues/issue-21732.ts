/*
 * @Author: Stevie
 * @Date: 2021-06-07 10:50:07
 * @LastEditTime: 2021-06-08 15:51:52
 * @LastEditors: Stevie
 * @Description:
 */
function typeGuard<K extends string, T extends object>(key: K, genericObj: T, concreteObj: { foo: string }) {
  if ('a' in concreteObj) {
    // concreteObj.a; 
  }
  if ('a' in genericObj) {
    // genericObj.a;
  }
  if (key in genericObj) {
    // genericObj.key;
  }
}