const flag = true;
if (flag) {
  // 动态导入
  import('./moduleA');
} else {
  import('./moduleB');
}
