const path = require('path');

module.exports = {
  // 其它配置选项...

  // 配置node属性
  node: {
    // 在这里可以模拟Node.js全局变量或模块
    fs: 'empty' // 将fs模块设置为空，以在浏览器中不引入fs模块
    // 其它模块设置...
  }
};