/*
 * @Author: Stevie
 * @Date: 2021-06-08 15:47:18
 * @LastEditTime: 2021-06-08 15:48:28
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
  [K in keyof T]: Exclude<T[K], Function>
}

type typeB = excludeFunction<InterfaceA>;

// * expected result
type Type = 'funcA' | 'funcB';

type typeF = Exclude<string | number | (() => void), Function>;