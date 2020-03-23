// 1. 在一个模块中只能使用一次export default
export function getTitle() {
  console.log('title:', document.title);
}

class ModuleC {
  constructor() {}
  getLocation() {
    console.log('location:', document.location);
  }
  getDomain() {
    console.log('domain:', document.domain);
  }
}
// 2. export default可以先声明再导出
export default ModuleC;
