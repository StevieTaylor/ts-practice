/*
 * @Author: Stevie
 * @Date: 2021-06-10 23:11:04
 * @LastEditors: Stevie
 * @LastEditTime: 2021-06-10 23:20:39
 * @Description: 提取枚举的key 和 value
 */
enum EnumA {
  USER = 'user',
  DOCTOR = 'doctor',
  PERSON = 'person'
}

type valueUnion = `${keyof { [key in EnumA]: string }}`;

type keyUnion = keyof typeof EnumA;
