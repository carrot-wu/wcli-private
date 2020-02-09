module.exports = {
  'parser': '@typescript-eslint/parser', //定义ESLint的解析器
  'extends': ['airbnb-base', 'plugin:@typescript-eslint/recommended'],//定义文件继承的子规范
  'plugins': ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
  'env': {                          //指定代码的运行环境
    'browser': true,
    'node': true,
  },
  'rules': {
    //缩进双空格
    '@typescript-eslint/indent': ['error', 2],
    //接口命名允许以I开头
    '@typescript-eslint/interface-name-prefix': 0,
    //允许不添加分号
    'semi': 0,
    // 不检测花括号后是否要换行
    'object-curly-newline': 0,
    // import引入文件允许不添加后缀
    'import/extensions': 0,
    // 允许匿名function声明
    'func-names': 0,
    // 允许添加console
    'no-console': 0,
    // 禁止有最大长度检查
    'max-len': 0,
    // 允许export一个模块
    'import/prefer-default-export': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'consistent-return': 0
  },
  'settings': {
    //解决路径引用ts文件报错的问题
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
