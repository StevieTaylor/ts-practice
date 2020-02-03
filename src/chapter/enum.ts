import { p } from '../tools/print';

p('-------------------枚举-----------------');

const return2 = () => 2;
// 1.数字枚举,不能在计算后的表达式后面添加枚举字段
enum CODE {
  success, // 默认第一个为0
  info,
  error = return2()
}

enum ResCode {
  success = 200,
  error = 400,
  notFound = 404
}
p(CODE);
p(CODE.success);
p(ResCode);
p('success:', ResCode.success);

// 2.字符串枚举
enum ResMessage {
  Success = 'success',
  Error = 'error',
  ClientError = Error
}
p(ResMessage);
p(ResMessage.ClientError);

// 3.异构枚举，尽量不使用
enum Respond {
  Success,
  ErrorMsg = 'error',
  NotFound = 404
}
p(Respond);

/*
 * 当满足以下3种情形时，枚举及其成员可用作类型
 *   1. 无初始值, enum E { A,B,C }
 *   2. 数字字面量, enum E { A=1,B=2,C=4 }
 *   3. 字符串字面量, enum E { A='a',B='b',C='c' }
 */
// 4.枚举成员类型
enum Status {
  Ok = 200,
  Forbidden = 403,
  NotFound = 404
}
// 将枚举的成员用作类型
interface Success {
  code: Status.Ok;
}
let success: Success = {
  code: Status.Ok
};
p(success);

// 5.联合枚举类型
interface Response {
  status: Status;
}
// 模拟http请求，使用枚举可以提高代码的语义化
const CheckStatus = (res: Response) => {
  if (res.status === Status.Ok) {
    p('请求成功');
  } else if (res.status === Status.Forbidden) {
    p('访问拒绝');
  }
};
CheckStatus({
  status: 200
});

// 6.const枚举：为了避免额外生成代码,在编译阶段会被删除
const enum Level {
  Low,
  Middle,
  High
}
// p(Level); 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用
let levels = [Level.Low, Level.Middle, Level.High];
p(levels); // [0, 1, 2]
