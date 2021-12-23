module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'babel-eslint',  // Specifies the ESLint parser
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true, // enable global strict mode
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'promise',
    'prettier',
  ],
  rules: {
    'no-var': 'error', // 禁止使用 var
    'prefer-const': 'error', // 建议使用 const
    'no-const-assign': 'error', // 禁止修改使用 const(no-const-assign) 声明的变量
    'object-shorthand': 'error', // 方法属性值简写
    'quote-props': ['error', 'as-needed'], // 只对那些无效的标示使用引号 ''
    'no-array-constructor': 'error', // 数组要求字面量赋值
    'no-new-object': 'error', // 对象要求字面值创建对象
    'array-callback-return': 'error', // 在数组方法的回调中强制执行
    quotes: ['error', 'single'], // string 统一用单引号 ''
    'prefer-template': 'error', // 建议使用模板字符串
    'no-eval': 'error', // 禁止使用 eval
    'no-useless-escape': 'error', // 不要使用不必要的转义字符
    'func-style': 'error', // 用命名函数表达式而不是函数声明
    'prefer-rest-params': 'error', // 建议使用 rest 参数而不是参数
    'space-before-function-paren': ['error', 'never'], // 函数前不允许使用空格或
    'space-before-blocks': ['error', 'always'], // 块前需要空格
    'no-param-reassign': 'error', // 不允许重新分配函数参数
    'prefer-spread': 'error', // 建议使用 spread 语法而不是 .apply()
    'prefer-arrow-callback': 'error', // 建议使用箭头函数
    'arrow-spacing': 'error', // 箭头函数的箭头前后需要空格
    'no-confusing-arrow': ['error', {allowParens: true}], // 不允许箭头函数与比较混淆
    'no-useless-constructor': 'error', // 不允许不必要的构造函数
    'no-dupe-class-members': 'error', // 不允许在类成员中使用重复名称
    'no-duplicate-imports': ['error', {includeExports: true}], // 不允许重复导入
    'dot-notation': 'error', // 访问属性时使用点符号
    'no-restricted-properties': 'error', // 做幂运算时用幂操作符 **
    'no-multi-assign': 'error', // 不要使用连续变量分配
    'no-unused-vars': 'error', // 不允许有未使用的变量
    eqeqeq: ['error', 'always'], // 使用 === 和 !== 而不是 == 和 !=
    'no-case-declarations': 'error', // 不允许在 case/default 子句中使用词法声明
    'no-nested-ternary': 'error', // 三元表达式不应该嵌套,通常是单行表达式
    'no-unneeded-ternary': 'error', // 避免不需要的三元表达式
    'no-mixed-operators': 'error', // 不允许不同运算符的混合
    'nonblock-statement-body-position': ['error', 'beside'], // 强制单行语句的位置
    'brace-style': 'error', // 需要大括号样式
    'no-else-return': 'error', // 如果 if 语句都要用 return 返回,那后面的else就不用写了.如果 if 块中包含 return ,它后面的 else if 块中也包含了 return ,这个时候就可以把 else if 拆开
    indent: ['error', 2, {SwitchCase: 1}], // 强制2个空格
    'keyword-spacing': ['error', {before: true}], // 在关键字前后强制使用一致的间距
    'space-infix-ops': ['error', {int32Hint: false}], // 用空格来隔开运算符
    'padded-blocks': ['error', 'never'], // 不要故意留一些没必要的空白行
    'array-bracket-spacing': ['error', 'never'], // 方括号里不加空格
    'object-curly-spacing': ['error', 'never'], // 花括号 {} 里不加空格
    'comma-spacing': ['error', {before: false, after: true}], //  ','前避免空格, ','后需要空格
    'key-spacing': ['error', {beforeColon: false}], // 在对象的属性中,键值之间要有空格
    'no-trailing-spaces': 'error', // 行末不要空格
    'no-multiple-empty-lines': 'error', // 避免出现多个空行.在文件末尾只允许空一行
    'no-new-wrappers': 'error', // 不允许基元包装实例
    radix: ['error', 'as-needed'], // 需要基数参数
    camelcase: ['error', {properties: 'always'}], // 要求驼峰式命名对象、函数、实例
    'new-cap': 'error', // 要求构造函数名称以大写字母开头
    'spaced-comment': ['error', 'always', {
      line: {
        markers: ['/'],
        exceptions: ['-', '+'],
      },
      block: {
        markers: ['!'],
        exceptions: ['*'],
        balanced: true,
      },
    }], // 注释规范
    'import/no-mutable-exports': 'error', // 不要导出可变的绑定
    'import/first': 'error', // import 放在其他所有语句之前
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': ['error', {  // 定义组件形式
      namedComponents: 'arrow-function',  // 允许使用箭头函数
    }],
    'linebreak-style': [
      'error',
      'unix',
    ],
    semi: [
      'error',
      'never',
    ],
  },
}
