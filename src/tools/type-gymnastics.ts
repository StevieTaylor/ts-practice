/*
 * @Author: Stevie
 * @Date: 2021-06-08 15:47:18
 * @LastEditTime: 2021-06-08 19:23:59
 * @LastEditors: Stevie
 * @Description: 类型体操锻炼
 */
interface InterfaceA {
  propA: string;
  propB: number;
  funcA: () => void;
  funcB: (...args: any[]) => Promise<void>;
}

type excludeFunction<T> = {
  [K in keyof T]: Exclude<T[K], Function>;
};

type PickNever<T> = {
  [K in keyof T]: [T[K]] extends [never] ? K : never;
}[keyof T];

type typeA = excludeFunction<InterfaceA>;
type typeB = PickNever<typeA>;

// * expected result
type Type = 'funcA' | 'funcB';

type typeF = Exclude<string | number | (() => void), Function>;
