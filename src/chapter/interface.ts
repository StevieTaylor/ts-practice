import { p } from '../tools/print';

p('-------------------接口-----------------');

// 一、基本用法：约束类型
interface PersonName {
  firstName: string;
  lastName: string;
}

const getName = ({ firstName, lastName }: PersonName): string => {
  return `全名: ${firstName} ${lastName}`;
};
p(getName({ firstName: 'Stevie', lastName: 'Hoang' }));

// 二、可选属性 ?
interface PersonInfo {
  name: string;
  age: string;
  job?: string;
}

const getPersonInfo = (personInfo: PersonInfo) => {
  if (personInfo.job) {
    return `$`;
  }
};
